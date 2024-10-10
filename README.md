
# Illustrator EPS Processing Script

This project contains a JavaScript (JSX) script for Adobe Illustrator that automates the process of opening EPS files, converting the document color mode to CMYK, resizing, grouping, and saving the files as new EPS files. 

## Features
- **Automatic EPS Processing:** Open EPS files from a specified folder, group and resize their contents, and convert them to CMYK color mode.
- **Artboard Resizing:** Resize the artboard to a specified dimension (5000x5000 pixels) to standardize the canvas size.
- **EPS Saving Options:** Save the processed EPS files with CMYK color settings and PostScript Level 2 compatibility.

## Prerequisites
- Adobe Illustrator installed on your system.
- Basic knowledge of running JSX scripts in Adobe Illustrator.
- **Important:** Before running this script, you must have at least one document open in Adobe Illustrator. Open any blank document manually to ensure that the `executeMenuCommand` function works properly.

## Installation
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/your-repository-name.git
   ```
2. Open Adobe Illustrator.
3. Navigate to `File > Scripts > Other Script` and browse to the location of the JSX file in this repository.

## Usage
1. **Select the Input Folder:** The script will prompt you to select a folder that contains the EPS files to be processed.
2. **Select the Output Folder:** You will be prompted to select a destination folder where the processed EPS files will be saved.
3. The script will then:
   - Open each EPS file.
   - Convert the document color mode to CMYK.
   - Resize and center the contents on a 5000x5000 pixel artboard.
   - Save the updated EPS files with the specified options.

## Code Explanation
### `groupAndResizeItemsInDocument()`
- Converts the document color mode to CMYK using `app.executeMenuCommand('doc-color-cmyk')`.
- Groups and resizes the items in the document to fit a 5000x5000 pixel artboard.
- Centers the grouped items on the artboard.

### `processFilesInFolder(inputFolderPath, outputFolderPath)`
- Processes all EPS files in the input folder.
- Calls `groupAndResizeItemsInDocument()` for each file.
- Saves the modified EPS files in the output folder using specific EPS save options.

## EPS Save Options
The following EPS save options are configured in the script:
- **Compatibility:** Illustrator 10 EPS
- **Embed Fonts:** Fonts are embedded for other applications.
- **Include Document Thumbnails:** Thumbnails are included in the saved file.
- **CMYK PostScript:** Ensures CMYK PostScript is used in RGB files.
- **PostScript Level:** Adobe PostScript Level 2 compatibility.

## Notes
- **Before running the script, make sure to manually open a blank document in Illustrator.** This is necessary for the script's `executeMenuCommand` to function correctly.
- This script uses `app.executeMenuCommand('doc-color-cmyk')` to switch the color mode, which requires that the document is fully loaded and active.

## Troubleshooting
- If the color mode is not converting to CMYK, ensure that the document is open and active in Illustrator.
- The script may run faster than Illustrator can handle. If this occurs, try adding a delay using `app.redraw()` to ensure each step completes before the next starts.

## Contributing
If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
