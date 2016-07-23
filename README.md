# IllustratorBulkExporter
*Easily "Export for web" in a lot of dimensions at a time*

## Instructions

 1. Download [IllustratorBulkExporter.jsx](https://raw.githubusercontent.com/chteuchteu/IllustratorBulkExporter.jsx/master/IllustratorBulkExporter.jsx)
 on your computer
 2. Open it, and customize its options:
 
    ```js
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
    ```
    
    > Note: fileName may contain one subdirectory. `{}` will be replaced with the dimension.
 
 3. Open your file in Illustrator
 4. File > Scripts > Other Script...
 5. Browse to IllustratorBulkExporter.jsx that you just saved
 6. In the dialog that just opened, choose the output directory
 7. Enjoy!
