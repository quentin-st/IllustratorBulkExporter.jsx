/**
 * IllustratorBulkExporter.jsx
 * Easily "Export for web" in a lot of dimensions at a time
 * https://github.com/chteuchteu/IllustratorBulkExporter.jsx
 * Quentin Stoeckel <stoeckel.quentin@gmail.com>
 */

var options = {
    dimensions: [
        16,
        18,
        19,
        32,
        36,
        38,
        48,
        64,
        90,
        128,
        256
    ],
    fileName: 'icon-{}x{}.png'
};



var CustomExporter = function(options) {
    this.options = options;
};

CustomExporter.prototype = {
    doExport: function() {
        var self = this;

        this.folder = Folder.selectDialog();
        this.document = app.activeDocument;

        if (!this.document || !this.folder)
            throw new Error("Invalid folder or document.");

        for (var i=0; i<this.options.dimensions.length; i++) {
            var dimension = this.options.dimensions[i];
            var fileName = self.options.fileName.split('{}').join(dimension);
            self.saveToRes(dimension, fileName);
        }
    },

    saveToRes: function(scaleTo, fileName) {
        scaleTo = scaleTo/this.document.width*100.0;

        var layer, resFolder;

        if (fileName.indexOf('/') != -1) {
            // Create subdirectory
            var subdir = fileName.substr(0, fileName.indexOf('/'));
            resFolder = new Folder(this.folder.fsName + '/' + subdir);
            fileName = fileName.substr(t.indexOf('/')+1);
        }
        else
            resFolder = this.folder;

        if (!resFolder.exists)
            resFolder.create();

        for (var i = this.document.layers.length - 1; i >= 0; i--) {
            layer = this.document.layers[i];

            if (!layer.locked && layer.name.indexOf("!") === -1) {
                this.hideAllLayers();
                layer.visible = true;

                var file = new File(resFolder.fsName+ "/" + fileName);

                var options = new ExportOptionsPNG24();
                options.antiAliasing = true;
                options.transparency = true;
                options.artBoardClipping = true;
                options.verticalScale = scaleTo;
                options.horizontalScale = scaleTo;

                this.document.exportFile(file, ExportType.PNG24, options);
            }
        }
    },

    hideAllLayers: function() {
        for (var i = this.document.layers.length - 1; i >= 0; i--) {
            var layer = this.document.layers[i];
            if (!layer.locked && layer.name.indexOf("!") === -1) {
                layer.visible = false;
            }
        }
    }
};

var exporter = new CustomExporter(options);
exporter.doExport();
