function groupAndResizeItemsInDocument() {

    // Aktif belgeyi al
    var doc = app.activeDocument;   
    app.executeMenuCommand('doc-color-cmyk'); // CMYK renk moduna dönüştür
    // Tüm nesneleri seç
    doc.selectObjectsOnActiveArtboard();

    // Aktif artboard'u al
    var activeArtboard = doc.artboards[doc.artboards.getActiveArtboardIndex()];

    // Mevcut artboard sınırlarını al
    var artboardBounds = activeArtboard.artboardRect;

    // Genişlik ve yüksekliği güncelle (sol ve üst konumları koru)
    artboardBounds[2] = artboardBounds[0] + 5000; // Sağ kenar = sol kenar + genişlik
    artboardBounds[3] = artboardBounds[1] - 5000; // Alt kenar = üst kenar - yükseklik

    // Yeni artboard boyutlarını ayarla
    activeArtboard.artboardRect = artboardBounds;

    // Seçilen nesneleri grupla
    var selectedItems = doc.selection;
    if (selectedItems.length > 0) {
        var group = doc.groupItems.add();
        for (var i = 0; i < selectedItems.length; i++) {
            selectedItems[i].move(group, ElementPlacement.PLACEATEND);
        }

        // Grubun sınırlarını al
        var bounds = group.visibleBounds;
        var groupWidth = bounds[2] - bounds[0];
        var groupHeight = bounds[1] - bounds[3];

        // Ölçeklendirme faktörünü hesapla
        var scalingFactor;
        if (groupWidth > groupHeight) {
            scalingFactor = 5000 / groupWidth;
        } else {
            scalingFactor = 5000 / groupHeight;
        }

        // Grubu yeniden boyutlandır
        group.resize(scalingFactor * 100, scalingFactor * 100); // Resize function expects percentages

        // Artboard'un merkezini hesapla
        var artboardCenterX = (artboardBounds[0] + artboardBounds[2]) / 2;
        var artboardCenterY = (artboardBounds[1] + artboardBounds[3]) / 2;

        // Grubun merkezini hesapla
        var groupCenterX = (bounds[0] + bounds[2]) / 2;
        var groupCenterY = (bounds[1] + bounds[3]) / 2;

        // Grubun artboard merkezine kaydırılması için gerekli ofsetleri hesapla
        var offsetX = artboardCenterX - groupCenterX;
        var offsetY = artboardCenterY - groupCenterY;

        // Grubu artboard'un merkezine taşı
        group.position = [group.position[0] + offsetX, group.position[1] + offsetY];

        // Deselect the group after positioning
        group.selected = false;

    } else {
        alert("No items to group.");
    }
    
}


function processFilesInFolder(inputFolderPath, outputFolderPath) {
    var inputFolder = new Folder(inputFolderPath);
    var files = inputFolder.getFiles("*.eps"); // Get all EPS files in the folder

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var doc = app.open(file); // Open the file
        groupAndResizeItemsInDocument(); // Perform the grouping and resizing

        // Construct the output file path
        var outputFilePath = outputFolderPath + "/" + file.name.replace(".ai", ".eps");

        // EPS Save Options configuration with CMYK settings
        var saveOptions = new EPSSaveOptions();
        saveOptions.compatibility = Compatibility.ILLUSTRATOR10; // Illustrator 10 EPS

        saveOptions.embedAllFonts = true; // Embed fonts for other applications
        saveOptions.includeDocumentThumbnails = true; // Include document thumbnails
        saveOptions.cmykPostScript = true; // Ensure CMYK PostScript is used
        saveOptions.postScript = EPSPostScriptLevelEnum.LEVEL2; // Adobe PostScript Level 2

        doc.saveAs(new File(outputFilePath), saveOptions);

        // Close the document without saving changes
        doc.close(SaveOptions.DONOTSAVECHANGES);
    }
}

// createe a empty any file to execute the color change mode
// Prompt user to select the input folder
var inputFolder = Folder.selectDialog("Select the folder containing the Illustrator files:");
if (inputFolder) {
    // Prompt user to select the output folder
    var outputFolder = Folder.selectDialog("Select the folder to save the processed Illustrator files:");
    if (outputFolder) {
        processFilesInFolder(inputFolder.fsName, outputFolder.fsName); // Process the files in the selected folder and save them to the output folder
    } else {
        alert("No output folder selected.");
    }
} else {
    alert("No input folder selected.");
}
