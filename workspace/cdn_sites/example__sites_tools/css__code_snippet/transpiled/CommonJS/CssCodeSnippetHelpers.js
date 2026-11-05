"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CssCodeSnippetHelpers = void 0;
class CssCodeSnippetHelpers {
    static linesNumbersTextToConsole(linesNumber) {
        console.log(`Custom lines numbers ( ${linesNumber} ) text generated to use with lines-numbers-variables`, { "linesNumbers": CssCodeSnippetHelpers.getLinesNumbersString(linesNumber) });
    }
    static getLinesNumbersString(linesNumber) {
        const numberToUnicode = {
            "0": "\\0030",
            "1": "\\0031",
            "2": "\\0032",
            "3": "\\0033",
            "4": "\\0034",
            "5": "\\0035",
            "6": "\\0036",
            "7": "\\0037",
            "8": "\\0038",
            "9": "\\0039"
        };
        const whiteSpaceEncoded = "\\00a";
        let retValue = "";
        const numbers = [];
        for (let i = 1; i <= linesNumber; i++) {
            numbers.push(i);
        }
        retValue = numbers
            .reduce((previousVaue, currentValue) => {
            let lineNumberString = "" + currentValue;
            let lineNumberStringEncoded = "";
            for (let i = 0; i < lineNumberString.length; i++) {
                lineNumberStringEncoded += numberToUnicode[lineNumberString[i]];
            }
            previousVaue += lineNumberStringEncoded + whiteSpaceEncoded;
            return previousVaue;
        }, "");
        return (retValue);
    }
}
exports.CssCodeSnippetHelpers = CssCodeSnippetHelpers;
//# sourceMappingURL=CssCodeSnippetHelpers.js.map