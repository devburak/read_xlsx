const SheetJSFT = [
    "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", 
    "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "wb*", "wq*", "html", "htm"
].map(function(x) { return "." + x; }).join(",");