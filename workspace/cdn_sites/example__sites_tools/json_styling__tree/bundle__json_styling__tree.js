class JPathData {
    _jpath;
    _jpathExpression;
    _isPlaceholderValue;



    constructor() {
        this._jpath = [];
        this._jpathExpression = "";
        this._isPlaceholderValue = 0;
    }



    isPlaceholderValue() {
        return this._isPlaceholderValue;
    }



    setIsPlaceholderValue(isPlaceholder) {
        this._isPlaceholderValue = isPlaceholder;


        return this;
    }



    getJPath() {
        return this._jpath;
    }



    setJPath(jpath) {
        this._jpath = jpath;

        if (!this._jpath || this._jpath.length === 0) {
            this._isPlaceholderValue = 1;
        }
        else {
            this._isPlaceholderValue = 0;
        }


        return this;
    }



    getJPathExpression() {
        return this._jpathExpression;
    }



    setJPathExpression(jpathExpression) {
        this._jpathExpression = jpathExpression;


        return this;
    }
}


class JPathImpl {
    static JPATH_EXPRESSION_MAX_SIZE = 16;
    _jpathExpressionMaxSize;



    constructor() {
        this._jpathExpressionMaxSize = JPathImpl.JPATH_EXPRESSION_MAX_SIZE;
    }



    setExpressionMaxSize(expressionMaxSize) {
        this._jpathExpressionMaxSize = expressionMaxSize;


        return this;
    }


    // jpath string exression as "subtree[1].opened" => [ "subtree", 1, "opened" ]
    // with this art of array of properties names of javascript object tree
    //  it is easier to get the property value of any datatype in javascript objects and arrays.
    //  later usage of the jpath array:
    //    let jpath = JPath.parse( "subtree[1].opened" );
    //    let obj = { "subtree": [{ "opened": false }, { "opened": true }] };
    //    let valueFound = JPath.getByJPath( jpath, obj );
    //    console.log( valueFound );
    //    prints out => true
    parse(jpathExpression) {
        const jpathArray = [];
        const jpathExpressionSubstrings_ByLeftEnbraces = jpathExpression.split("[");
        let jpathKeyString = "";
        let jpathKeyNumeric = 0;
        let counter_left_enbraces = 1;
        let jpathExpressionArray_ByLeftEnbracesLen = jpathExpressionSubstrings_ByLeftEnbraces.length;
        let maxNumber_left_enbraces = (jpathExpressionArray_ByLeftEnbracesLen + 2);
        let id_left_enbraces = 0;
        let splittedBy_left_enbraces_substr = "";
        let firstLeftBracePos = jpathExpression.indexOf("[");


        //@ts-ignore
        let jpathItemsAdded = 0;

        whl_left_enbraces: while (counter_left_enbraces <= maxNumber_left_enbraces) {
            counter_left_enbraces++;

            if (counter_left_enbraces >= maxNumber_left_enbraces) {
                break whl_left_enbraces;
            }
            id_left_enbraces = (counter_left_enbraces - 2);
            splittedBy_left_enbraces_substr = jpathExpressionSubstrings_ByLeftEnbraces[id_left_enbraces];

            if (splittedBy_left_enbraces_substr.length === 0) {
                continue whl_left_enbraces;
            }

            if ((counter_left_enbraces === 2) && (firstLeftBracePos !== 0)) {
                jpathItemsAdded = this.parseDotted(
                    splittedBy_left_enbraces_substr,
                    jpathArray
                );
                continue whl_left_enbraces;
            }
            const jpathExpressionSubstrings_ByRightEnbraces = splittedBy_left_enbraces_substr.split("]");
            let jpathExpressionArray_ByRightEnbracesLen = jpathExpressionSubstrings_ByRightEnbraces.length;

            if (jpathExpressionArray_ByRightEnbracesLen === 0) {
                continue whl_left_enbraces;
            }
            jpathKeyString = jpathExpressionSubstrings_ByRightEnbraces[0];
            jpathKeyNumeric = +jpathKeyString;

            if (jpathExpressionArray_ByRightEnbracesLen === 1) {
                if (Number.isInteger(jpathKeyNumeric) === true) {
                    jpathArray.push(jpathKeyNumeric);
                }
                else {
                    jpathArray.push(jpathKeyString);
                }
                continue whl_left_enbraces;
            }
            else if (jpathExpressionArray_ByRightEnbracesLen === 2) {
                if (Number.isInteger(jpathKeyNumeric) === true) {
                    jpathArray.push(jpathKeyNumeric);
                }
                else {
                    jpathArray.push(jpathKeyString);
                }

                if (jpathExpressionSubstrings_ByRightEnbraces[1] === ".") {
                    continue whl_left_enbraces;
                }
            }
            else if ((jpathExpressionArray_ByRightEnbracesLen === 3)) {
                console.error("JPath Expression square braces wrong.");
                continue whl_left_enbraces;
            }
            let substr_ByRightEnbraces = jpathExpressionSubstrings_ByRightEnbraces[1];
            jpathItemsAdded = this.parseDotted(
                substr_ByRightEnbraces,
                jpathArray
            );
            continue whl_left_enbraces;
        }


        return jpathArray;
    }


    // @method protected parseDotted( ... @args ): number
    // @inokedBy method: public parse ( jpathExpression: string ): (string|number)[]
    // splitted with symbol point, adds to jpathArray, numeric array elem id or textual field name.
    parseDotted(
        jpathExpressionDotted,
        jpathArray
    ) {
        let addedNumber = 0;
        let jpathExpressionSubstrings = jpathExpressionDotted.split(".");
        let splittedBy_dot_substr = "";
        let jpathKeyString = "";
        let jpathKeyNumeric = 0;
        let counter_dotted = 1;
        let jpathExpressionArray_dottedLen = jpathExpressionSubstrings.length;
        let maxNumber_dotted = (jpathExpressionArray_dottedLen + 2);
        let id_dotted = 0;

        whl_dotted: while (counter_dotted <= maxNumber_dotted) {
            counter_dotted++;

            if (counter_dotted >= maxNumber_dotted) {
                break whl_dotted;
            }
            id_dotted = (counter_dotted - 2);
            splittedBy_dot_substr = jpathExpressionSubstrings[id_dotted];

            if (splittedBy_dot_substr.length === 0) {
                continue whl_dotted;
            }
            jpathKeyString = splittedBy_dot_substr;
            jpathKeyNumeric = +jpathKeyString;

            if (Number.isInteger(jpathKeyNumeric) === true) {
                jpathArray.push(jpathKeyNumeric);
            }
            else {
                jpathArray.push(jpathKeyString);
            }
            continue whl_dotted;
        }


        return addedNumber;
    }



    serialize(
        jpath,
        concatenator,
        start,
        finish
    ) {

        // @retVal
        let jpathExpression = "";
        let jpathJoined = jpath.join(concatenator);
        let locJpath = new Array();
        let startNotZerolen = ((start !== undefined) && (start !== null) && (start.length > 0));
        let finishNotZerolen = ((finish !== undefined) && (finish !== null) && (finish.length > 0));

        if ((startNotZerolen === false) && (finishNotZerolen === false)) {

            // @retVal
            jpathExpression = jpathJoined;
        }
        else if (startNotZerolen === true) {
            locJpath = [start, jpathJoined];
        }

        if (finishNotZerolen === true) {
            locJpath.push(finish);
        }

        if (locJpath.length > 0) {

            // @retVal
            jpathExpression = locJpath.join("");
        }


        return jpathExpression;
    }



    getByJPathExpression(obj, jpathExpression) {
        const jpath = this.parse(jpathExpression);


        return this.getByJPath(obj, jpath);
    }


    // faster than JPath.getByJPathExpression( jpathExpression: string, value: any );
    // recommended when the lookup more than once with the same jpathExpression,
    // or when You already at once build the jpath array variables to perform lookups
    // like this: let jpath: (string|number)[] = [ "tokens", "startTokens", 0, "length" ];
    //    let jpath = JPath.parse( "subtree[1].opened" ); => [ "subtree", 1, "opened" ]
    //    let obj = { "subtree": [{ "opened": false }, { "opened": true }] };
    //    let valueFound = JPath.getByJPath( jpath, obj );
    //    console.log( valueFound );
    //    prints out => true
    getByJPath(obj, jpath) {
        if ((obj === undefined) || (obj === null)) {
            return null;
        }

        if (!jpath || jpath.length === 0) {
            return obj;
        }
        let targetValue = obj;
        let jpathValueFound = {};
        let jpathPropertyKey = "";
        let jpathPropLevel = 0;
        let jpathLevelMax = Math.min(
            jpath.length,
            JPathImpl.JPATH_EXPRESSION_MAX_SIZE
        );

        for (jpathPropLevel = 0; jpathPropLevel < jpathLevelMax; jpathPropLevel++) {
            if (!targetValue) {
                break;
            }
            jpathPropertyKey = jpath[jpathPropLevel];
            jpathValueFound = targetValue[jpathPropertyKey];

            if (typeof jpathValueFound === "object") {
                if (Array.isArray(jpathValueFound) === true) {
                    targetValue = [...jpathValueFound];
                }
                else {
                    targetValue = { ...jpathValueFound };
                }
            }
            else {
                targetValue = jpathValueFound;
            }
        }


        return targetValue;
    }



    setByJPathExpression(obj, jpathExpression, value) {
        const jpath = this.parse(jpathExpression);
        this.setByJPath(obj, jpath, value);


        return this;
    }



    setByJPath(obj, jpath, value) {
        let locObj = obj;
        const jpathLen = jpath.length;
        let jpathLastIx = (jpathLen - 1);
        let datatypeJsonKey = "";
        let id = 0;
        let nextId = 0;
        let key = "";
        let lastKey = jpath[jpathLastIx];


        // let prevKey: any = "";
        let nextKey = "";


        // @loop_counter
        let counter = 1;
        let maxCounter = (jpathLen + 2);

        whl_jpath: while (counter < maxCounter) {

            // @inc_loop_counter
            counter++;


            // @loop_counter
            if (counter >= maxCounter) {
                break whl_jpath;
            }
            id = (counter - 2);
            nextId = (id + 1);


            // prevKey = key;
            key = jpath[id];

            if (nextId >= jpathLen) {
                nextKey = "";
            }
            else {
                nextKey = jpath[nextId];
            }

            if (id === jpathLastIx) {
                locObj[lastKey] = value;
                break whl_jpath;
            }

            if (!locObj[key]) {
                datatypeJsonKey = typeof (nextKey);

                if (datatypeJsonKey === "number") {
                    locObj[key] = new Array();
                }
                else {
                    locObj[key] = new Object();
                }
            }
            locObj = locObj[key];
            continue whl_jpath;
        }


        return this;
    }



    setByJPathWalkFlatRebuild(
        obj,
        jpath,
        value,
        nameHolderId,
        nameId,
        branchName
    ) {
        const jpathLen = jpath.length;
        let jpathIx;
        let jpathLastIx = jpathLen - 1;
        let id = null;
        let holderId = jpath[0];
        let foundNode = null;
        let newItem = null;
        id = jpath[0];
        obj[nameId] = id;

        for (jpathIx = 1; jpathIx < jpathLen; jpathIx++) {
            id = jpath[jpathIx];
            foundNode = false;
            let toGetById = [];

            if (Array.isArray(obj)) {
                toGetById = obj;
            }
            else if (obj[branchName]) {
                toGetById = obj[branchName];
            }
            else if (!obj[branchName]) {
                obj[branchName] = new Array();
                toGetById = obj[branchName];
            }
            foundNode = toGetById.find((node) => {
                const matches = (node[nameId] === id);


                return matches;
            });

            if (!foundNode) {
                if (jpathIx === jpathLastIx) {
                    newItem = {
                        ...value,
                        [nameId]: id,
                        [nameHolderId]: holderId
                    };
                }
                else {
                    newItem = {
                        [nameId]: id,
                        [nameHolderId]: holderId
                    };
                }
                toGetById.push(newItem);
                obj[nameId] = holderId;
                const lastIx = (toGetById.length - 1);
                foundNode = toGetById[lastIx];
            }
            obj = foundNode;
            holderId = id;
        }


        return this;
    }
}


class JPath {

    // jpath string exression as "subtree[1].opened" => [ "subtree", 1, "opened" ]
    // with this art of array of properties names of javascript object tree
    //  it is easier to get the property value of any datatype in javascript objects and arrays.
    //  later usage of the jpath array:
    //    let jpath = JPath.parse( "subtree[1].opened" );
    //    let obj = { "subtree": [{ "opened": false }, { "opened": true }] };
    //    let valueFound = JPath.getByJPath( jpath, obj );
    //    console.log( valueFound );
    //    prints out => true
    static parse(jpathExpression) {
        const jpathImpl = (new JPathImpl());
        const retValue = jpathImpl.parse(jpathExpression);


        return (retValue);
    }


    // @method protected parseDotted( ... @args ): number
    // @inokedBy method: public parse ( jpathExpression: string ): (string|number)[]
    // splitted with symbol point, adds to jpathArray, numeric array elem id or textual field name.
    static parseDotted(
        jpathExpressionDotted,
        jpathArray
    ) {
        const jpathImpl = (new JPathImpl());
        const retValue = jpathImpl.parseDotted(
            jpathExpressionDotted,
            jpathArray
        );


        return (retValue);
    }



    static serialize(jpath, delimiter, start, finish) {
        const jpathImpl = (new JPathImpl());
        const retValue = jpathImpl.serialize(jpath, delimiter, start, finish);


        return (retValue);
    }



    static getByJPathExpression(obj, jpathExpression) {
        const jpathImpl = (new JPathImpl());
        const retValue = jpathImpl.getByJPathExpression(obj, jpathExpression);


        return (retValue);
    }


    // faster than JPath.getByJPathExpression( jpathExpression: string, value: any );
    // recommended when the lookup more than once with the same jpathExpression,
    // or when You already at once build the jpath array variables to perform lookups
    // like this: let jpath: (string|number)[] = [ "tokens", "startTokens", 0, "length" ];
    //    let jpath = JPath.parse( "subtree[1].opened" ); => [ "subtree", 1, "opened" ]
    //    let obj = { "subtree": [{ "opened": false }, { "opened": true }] };
    //    let valueFound = JPath.getByJPath( jpath, obj );
    //    console.log( valueFound );
    //    prints out => true
    static getByJPath(obj, jpath) {
        const jpathImpl = (new JPathImpl());
        const retValue = jpathImpl.getByJPath(obj, jpath);


        return (retValue);
    }



    static setByJPathExpression(obj, jpathExpression, value) {
        const jpathImpl = (new JPathImpl());
        jpathImpl.setByJPathExpression(obj, jpathExpression, value);


        return jpathImpl;
    }



    static setByJPath(obj, jpath, value) {
        const jpathImpl = (new JPathImpl());
        jpathImpl.setByJPath(obj, jpath, value);


        return jpathImpl;
    }



    static setByJPathWalkFlatRebuild(
        obj,
        jpath,
        value,
        nameHolderId,
        nameId,
        branchName
    ) {
        const jpathImpl = (new JPathImpl());
        jpathImpl.setByJPathWalkFlatRebuild(
            obj,
            jpath,
            value,
            nameHolderId,
            nameId,
            branchName
        );


        return jpathImpl;
    }
}


class EventEmitter {
    eventsHandlersSetThisClass;
    debug;
    EventArtJSEvent;



    constructor() {
        this.eventsHandlersSetThisClass = {};
        this.debug = true;
        this.EventArtJSEvent = "JSEvent";
    }



    setDebug(inDebug) {
        this.debug = inDebug;


        return this;
    }



    isObjectEmpty(obj) {

        // Check if the object is null or undefined
        if (obj === undefined || obj === null) {
            return true;
        }


        // Check if the object is an actual object and not another type
        if (typeof obj !== "object") {
            return false;
        }


        // Check if the object has any own properties
        if (Object.keys(obj).length === 0) {
            return true;
        }


        // If all checks pass, the object is not undefined, null, or empty
        return false;
    }


    // this method just sets an event handler function by event name to an object,
    // and then all event handlers are executed on this.emitEvent method call.
    // this.emitEvent method call You can place inside Your js code,
    // where You wish to provide the interface of optional adding a custom event listener in Your JS class.
    addThisClassEventListener(eventName, eventHandler) {
        if (!this.eventsHandlersSetThisClass[eventName]) {
            this.eventsHandlersSetThisClass[eventName] = [];
        }
        this.eventsHandlersSetThisClass[eventName].push(eventHandler);


        return this;
    }


    // this.emitEvent method call You can place inside Your js code,
    // where You wish to provide the interface of optional adding a custom event listener in Your JS class.
    emitEvent(eventName, payload) {
        const eventEmitResults = [];

        if (this.debug) {
            console.log("event emitted", eventName);
        }

        if (this.isObjectEmpty(this.eventsHandlersSetThisClass)) {
            return eventEmitResults;
        }
        const eventHandlers = this.eventsHandlersSetThisClass[eventName];

        if (!eventHandlers || eventHandlers.length === 0) {
            if (this.debug) {
                console.log(
                    "no event handler for this event",
                    eventName
                );
            }


            return eventEmitResults;
        }

        for (const eventHandler of eventHandlers) {
            if (this.debug) {
                console.log(
                    "got event handler",
                    eventName
                );
            }

            if (!eventHandler || typeof eventHandler !== "function") {
                if (this.debug) {
                    console.log(
                        "event handler is not a function",
                        eventName,
                        eventHandler
                    );
                }
                continue;
            }

            if (this.debug) {
                console.log(
                    "calling event handler",
                    eventName,
                    eventHandler
                );
            }
            const eventHandlerResult = eventHandler.call(this, eventName, payload);
            const thisClass = this;
            const eventEmitResult = new class {
                eventArt = thisClass.EventArtJSEvent;
                selector = null;
                eventName = eventName;
                payload = payload;
                result = eventHandlerResult;
            };
            eventEmitResults.push(eventEmitResult);

            if (eventHandlerResult && eventHandlerResult.payloadReturned) {

                // @ts-ignore
                payload = eventHandlerResult.payloadReturned;
            }
        }


        return eventEmitResults;
    }
}


class ImprovedRenderEventEmitter extends EventEmitter {
    eventsHandlersSetDom;
    mainHolderHtmlNode;
    EventArtDOMEventOptimized;



    constructor() {
        super();
        this.eventsHandlersSetDom = {};
        this.mainHolderHtmlNode = null;
        this.EventArtDOMEventOptimized = "DOMEventOptimized";
    }



    setDebug(debug) {
        this.debug = debug;


        return this;
    }



    addDomEventListeners() {

        // here is just the right assignment of few dom event listeners.
        // Don't edit here, please!
        for (const eventName in this.eventsHandlersSetDom) {
            const eventHandlers = this.eventsHandlersSetDom[eventName];

            if (this.isObjectEmpty(eventHandlers)) {
                continue;
            }


            // here we add one dom event listener for each event, like click, contextmenu, dblcick and others, when any
            // @ts-ignore
            this.mainHolderHtmlNode.addEventListener(
                eventName,
                this.optimizedDomEventHandler.bind(this)
            );
        }


        return this;
    }


    // this method just sets an event handler function by event name and a holder elem selector to an object,
    // and then all event handlers are executed on this.emitDomEvent method call.
    // The difference is, that we addEventListener once to the main html node,
    // and not to each html node, it is best,
    // when the html tool is populated with a larger json data file of several tens or hundreds MBs, for example.
    addDomEventListener(
        eventName,
        selector,
        eventHandler
    ) {
        if (!this.eventsHandlersSetDom[eventName]) {
            this.eventsHandlersSetDom[eventName] = {};
        }

        if (!this.eventsHandlersSetDom[eventName][selector]) {
            this.eventsHandlersSetDom[eventName][selector] = [];
        }
        this.eventsHandlersSetDom[eventName][selector].push(eventHandler);


        return this;
    }


    // Don't edit here, please
    emitDomEvent(eventName, payload) {
        const results = [];
        const eventHandlersBySelectors = this.eventsHandlersSetDom[eventName];

        if (this.isObjectEmpty(eventHandlersBySelectors)) {
            return results;
        }

        for (const selector in eventHandlersBySelectors) {
            const eventHandlers = eventHandlersBySelectors[selector];

            if (!eventHandlers || eventHandlers.length === 0) {
                continue;
            }
            const eventTarget = payload.event.target.closest(selector);

            if (!eventTarget) {
                continue;
            }
            payload.eventTarget = eventTarget;

            for (const eventHandler of eventHandlers) {
                if (!eventHandler || (typeof eventHandler) !== "function") {
                    continue;
                }
                const result = eventHandler.call(this, payload);
                results.push({
                    eventArt: this.EventArtDOMEventOptimized,
                    eventName,
                    selector,
                    payload,
                    result
                });

                if (result && result.payloadReturned) {
                    payload = result.payloadReturned;
                }
            }
        }


        return results;
    }



    optimizedDomEventHandler(event) {
        const eventTarget = event.target;

        if (eventTarget
            && eventTarget.nodeName === "A"
            && eventTarget.getAttribute("HREF") !== "javascript: void(0);") {
            return;
        }
        event.preventDefault();
        event.stopPropagation();

        if (this.isObjectEmpty(this.eventsHandlersSetDom)) {
            return;
        }
        const eventName = event.type;
        const eventHandlers = this.eventsHandlersSetDom[eventName];

        if (this.isObjectEmpty(eventHandlers)) {
            return;
        }

        if (this.debug === true) {
            console.log("optimized event handler");
        }
        this.emitDomEvent(eventName, { event });
    }
}


class TokensParser {
    textEncoder;



    constructor() {
        this.textEncoder = new TextEncoder();
    }



    trimQuotes(str) {
        return str.replace(/^['"]|['"]$/g, "");
    }



    contentPreviewByRange(inBitsbuf, inBitsfufRefs) {
        let textDecoder = new TextDecoder("utf-8");
        let testRange = [];
        let refStart = 0;
        let refEnd = 0;
        let i = 0;

        for (i = 0; i < inBitsfufRefs.length; i++) {
            testRange = inBitsfufRefs[i];
            refStart = testRange[0];
            refEnd = testRange[1];
            let block = inBitsbuf.subarray(refStart, refEnd);
            let blockText = textDecoder.decode(block);


            // console.log( commentBlock );
            console.log(blockText);
        }
    }


    /**
     * @info based on method call .getRangeOfTokensSetMatch()
     * @returns number of tokensSets matched.
     * @param inBitsbuf : Uint8Array
     * @param inBitsbufRanges: number[][] the ranges of the inBitsbuf, where to lookup for start and end tokens sets.
     * @param inSeveralTokensSets: string[][], // where every tokensSet is array of datatype string[]
     * @param inOutRanges_WithoutTokenizedAreas : number[][]
     * @param inOutRanges_TokensSetsMatched : number[][][]
     * @param maxIterationsNumber : number
     */



    parseAroundSeveralTokensSets(
        inBitsbuf,
        inBitsbufRanges,


        // datatype explained: [ [startRef: number, endRef: number], [startRef: number, endRef: number], ... ];
        inSeveralTokensSets,


        // where one tokensSet is array of datatype string[]
        inOutRanges_WithoutTokenizedAreas,
        inOutRanges_TokensSetsMatched,
        maxIterationsNumber
    ) {
        let numberOfTokensSetsMatched = 0;
        let start = 0;
        let end = 1;
        let inBitsBufRange = new Array(2);
        let tokenMatchedRange = [0, 0];
        inBitsBufRange[0] = 0;
        inBitsBufRange[1] = end;
        let tokensSetId = 0;
        let tokenId = 0;
        let tokensSet = new Array();
        let severalTokensSets_AsUint8Array = new Array(inSeveralTokensSets.length);
        let tokensSet_AsUint8Array = new Array();
        let token_AsUint8Array = new Uint8Array();

        for (tokensSetId = 0; tokensSetId < inSeveralTokensSets.length; tokensSetId++) {
            tokensSet = inSeveralTokensSets[tokensSetId];
            tokensSet_AsUint8Array = new Array(tokensSet.length);
            tokenId = 0;

            for (let token of tokensSet) {
                token_AsUint8Array = this.textEncoder.encode(token);
                tokensSet_AsUint8Array[tokenId] = token_AsUint8Array;
                tokenId++;
            }
            severalTokensSets_AsUint8Array[tokensSetId] = tokensSet_AsUint8Array;
        }

        tokens: for (tokensSetId = 0; tokensSetId < severalTokensSets_AsUint8Array.length; tokensSetId++) {
            if (!inOutRanges_TokensSetsMatched[tokensSetId]) {
                inOutRanges_TokensSetsMatched[tokensSetId] = new Array();
            }
            tokensSet_AsUint8Array = severalTokensSets_AsUint8Array[tokensSetId];

            lookupRanges: for (let lookupRange of inBitsbufRanges) {
                let i = 0;
                start = lookupRange[0];

                for (i = 0; i < maxIterationsNumber; i++) {
                    tokenMatchedRange = [0, 0];
                    let pos = this.getRangeOfTokensSetMatch(
                        inBitsbuf,
                        tokensSet_AsUint8Array,
                        tokenMatchedRange,
                        start,
                        lookupRange[1]
                    );

                    if (pos === false) {
                        continue lookupRanges;
                    }
                    inOutRanges_TokensSetsMatched[tokensSetId].push(tokenMatchedRange);
                    start = pos;
                }
            }
        }
        let flatMatchedRanges = new Array();

        tokens: for (tokensSetId = 0; tokensSetId < severalTokensSets_AsUint8Array.length; tokensSetId++) {
            let tokensMatchedRanges = inOutRanges_TokensSetsMatched[tokensSetId];

            for (let tokenMatchedRangeId = 0; tokenMatchedRangeId < tokensMatchedRanges.length; tokenMatchedRangeId++) {
                flatMatchedRanges.push(tokensMatchedRanges[tokenMatchedRangeId]);
            }
        }
        let orderedMatchedRanges = flatMatchedRanges
            .sort((rangeA, rangeB) => {
                let startA = rangeA[0];
                let startB = rangeB[0];

                if (startA === startB) {
                    return (0);
                }
                else if (startA > startB) {
                    return (1);
                }
                else if (startA < startB) {
                    return (-1);
                }


                return 0;
            });
        let range_WithoutTokenizedAreas = new Array(2);
        range_WithoutTokenizedAreas[0] = 0;

        lookupRanges: for (let lookupRange of inBitsbufRanges) {
            for (let range of orderedMatchedRanges) {
                range_WithoutTokenizedAreas[1] = range[0];
                inOutRanges_WithoutTokenizedAreas.push(range_WithoutTokenizedAreas);
                range_WithoutTokenizedAreas = new Array(2);
                range_WithoutTokenizedAreas[0] = range[1];
            }
            range_WithoutTokenizedAreas[1] = lookupRange[1];
            inOutRanges_WithoutTokenizedAreas.push(range_WithoutTokenizedAreas);
        }
        numberOfTokensSetsMatched = orderedMatchedRanges.length;


        return numberOfTokensSetsMatched;
    }


    /**
     * @info based on method call .getRangeOfTokensSetMatch()
     * @returns number of tokenized areas matched.
     * @param inBitsbuf : Uint8Array
     * @param inBitsbufRanges: number[][] the ranges of the inBitsbuf, where to lookup for start and end tokens sets.
     * @param inTokens : { "setBegin": string[], "setEnd": string[] }
     * @param inOutRanges_WithoutTokenizedAreas : number[][]
     * @param inOutRanges_EnbracedByTokens_Outer : number[][]
     * @param inOutRanges_EnbracedByTokens_Inner : number[][]
     * @param maximalIterationsNumber : number
     */



    parseWithStartAndEndTokensSets(
        inBitsbuf,
        inBitsbufRanges,


        // datatype explained: [ [startRef: number, endRef: number], [startRef: number, endRef: number], ... ];
        inTokens,
        inOutRanges_WithoutTokenizedAreas,
        inOutRanges_EnbracedByTokens_Outer,
        inOutRanges_EnbracedByTokens_Inner,
        maximalIterationsNumber
    ) {

        // POINTERS IN THE IN BUF, NORMALLY FILE CONTENTS.
        // refined inBitsbufRanges, same dataype as the inBitsbufRanges
        //  # let inOutRanges_WithoutTokenizedAreas: number[][] = [];
        // POINTERS IN THE IN BUF, NORMALLY FILE CONTENTS.
        // the refs, where the block, marked by parser, resides.
        // the marked block is delimitered in the file content with the start tokens set and the end tokens set.
        // For example:
        //        @import url( "https://url" );   \r\n
        //        @import url (https://url);\n
        // never sure, whether a background space somewhere or several, and whether surrounded with quotes symbols.
        // that is why we can relay on tokens sets, like this:
        //      the css import statement start denoted by tokens set: [ "@import", " url", "(" ]
        //              fnish of this line is denoted by tokens set: [ ")", ";" ]
        // since some formats are not too strict, and I in this method wanted to provide the way
        //    to relay on the very standard keywords and symbols in the formats.
        // The handling background spaces may be performed in the extending class.
        // this class gathers refs, to avoid strings copies by value when parsing, and when concatenating.
        // the css pack task here has to do several hundreds of copies and concatenations of css files each KBs long.
        // we save up several Mio. chars of css files hardcopying tasks.
        // this is for sure the workaround just with browsers' JavaScript,
        // since the String object for better work with texts was designed to copy by value.
        // to avoid, when assigning the text to another variable,
        // mistakely changed symbols in the origin var with text.
        // no bad for sure. I like this feature too.
        //  # let bitsBufRefs_ofTheTokenType: number[][] = [];
        let numberOfTokenizedAreasFound = 0;
        let startTokensSet = inTokens["setBegin"];
        let finishTokensSet = inTokens["setEnd"];
        let blockStartTokensSet = [...startTokensSet].map((token) => this.textEncoder.encode(token));
        let blockFinishTokensSet = [...finishTokensSet].map((token) => this.textEncoder.encode(token));
        let inBitsbufId = 0;
        let inBitsbufNumber = inBitsbufRanges.length;
        let counter = 0;
        let counterStop = (maximalIterationsNumber === 0) ? 10 : maximalIterationsNumber;
        let EOF_pos = 0;
        let refinedBlockRef = [0, 0];
        let blockRefClean = [0, 0];
        let tokenStartMatchedRange = [0, 0];
        let tokenEndMatchedRange = [0, 0];
        let rangeOuter = [0, 0];
        let rangeInner = [0, 0];
        let startPos = 0;
        let endPos = 1;


        // collect blocks refs without blocks delimitered by tokens
        /**
         * @var positionOfACharInTheInBitsBuf: number
         * @description the position of a char in the inBitsbuf. the inBitsbuf is normally the file contents bits buffer, octets aligned, to be parsed.
         */
        let positionOfACharInTheInBitsBuf = 0;
        let lookupStart = 0;

        iteratingInRangesOfRefs: for (inBitsbufId = 0; inBitsbufId < inBitsbufNumber; inBitsbufId++) {
            let inBitsBufRange = inBitsbufRanges[inBitsbufId];


            // datatype explained: [startRef: number, endRef: number]
            if (inBitsBufRange[startPos] === inBitsBufRange[endPos]) {

                // the range is empty, no need to parse.
                continue iteratingInRangesOfRefs;
            }
            positionOfACharInTheInBitsBuf = inBitsBufRange[startPos];
            EOF_pos = inBitsBufRange[endPos];


            // securing counter enabling exit to prevent eternal loop. In this method the eternal loop is not the feature's algorythm.
            counter = 0;

            for (counter = 0; counter < counterStop; counter++) {
                tokenStartMatchedRange = [...blockRefClean];
                lookupStart = positionOfACharInTheInBitsBuf;
                let lastCharOf_StartTokensSet_PositionInTheInBitsbuf = this.getRangeOfTokensSetMatch(
                    inBitsbuf,
                    blockStartTokensSet,
                    tokenStartMatchedRange,
                    lookupStart,
                    EOF_pos
                );


                // start block tokens set did not match,
                // trying to match the next range
                if (lastCharOf_StartTokensSet_PositionInTheInBitsbuf === false) {

                    // no tokenized block was matched, the refined ranges array obtains exact the same range.
                    if (counter === 0) {
                        inOutRanges_WithoutTokenizedAreas.push([...inBitsBufRange]);
                    }
                    else {
                        refinedBlockRef[endPos] = inBitsBufRange[endPos];
                        inOutRanges_WithoutTokenizedAreas.push(refinedBlockRef);
                    }
                    continue iteratingInRangesOfRefs;
                }

                if (rangeOuter[0] !== 0 && rangeOuter[1] !== 0) {
                    inOutRanges_EnbracedByTokens_Outer.push(rangeOuter);
                    numberOfTokenizedAreasFound++;
                }
                rangeOuter = [...blockRefClean];
                rangeInner = [...blockRefClean];
                refinedBlockRef = [...blockRefClean];
                rangeOuter[startPos] = tokenStartMatchedRange[startPos];
                rangeInner[startPos] = tokenStartMatchedRange[endPos];
                refinedBlockRef[startPos] = positionOfACharInTheInBitsBuf;

                if (rangeOuter[startPos] !== 0) {

                    // the final byte pos stands before the first byte of the next range.
                    refinedBlockRef[endPos] = (rangeOuter[startPos] - 1);
                    inOutRanges_WithoutTokenizedAreas.push(refinedBlockRef);
                }


                // this.contentPreviewByRange( inBitsbuf, inOutRanges_WithoutTokenizedAreas );
                // HERE STARTING COMPARING BLOCK_FINISH TOKENS SEQUENCE.
                tokenEndMatchedRange = [...blockRefClean];
                lookupStart = rangeInner[startPos];
                let lastCharOf_EndTokensSet_PositionInTheInBitsbuf = this.getRangeOfTokensSetMatch(
                    inBitsbuf,
                    blockFinishTokensSet,
                    tokenEndMatchedRange,
                    lookupStart,
                    EOF_pos
                );

                if (lastCharOf_EndTokensSet_PositionInTheInBitsbuf === false) {
                    throw new Error("The file format is broken:\nThe start_block tokens set was deteced, however no end_block tokens set was detected.");
                }
                rangeInner[endPos] = tokenEndMatchedRange[startPos];
                rangeOuter[endPos] = (tokenEndMatchedRange[endPos] - 1);
                inOutRanges_EnbracedByTokens_Inner.push(rangeInner);


                // refs of the block:
                refinedBlockRef = [...blockRefClean];
                positionOfACharInTheInBitsBuf = tokenEndMatchedRange[endPos];


                // just used the reassigned variable,
                // since the name of this variable is explainatory.
                refinedBlockRef[startPos] = positionOfACharInTheInBitsBuf;
            }
        }
        this.log(
            "tokens_parser.log",
            450,
            "inOutRanges_EnbracedByTokens_Inner",
            JSON.stringify(
                inOutRanges_EnbracedByTokens_Inner,
                null,
                2
            ),
            inOutRanges_EnbracedByTokens_Inner[0],
            inBitsbuf,
            false
        ).then(_ret => 5);
        this.log(
            "tokens_parser.log",
            460,
            "inOutRanges_EnbracedByTokens_Outer",
            JSON.stringify(
                inOutRanges_EnbracedByTokens_Outer,
                null,
                2
            ),
            inOutRanges_EnbracedByTokens_Outer[0],
            inBitsbuf,
            true
        ).then(_ret => 5);


        return numberOfTokenizedAreasFound;
    }


    /**
     * @info based on method call .firstIndexOf()
     * @description this method writes into inOutRange the start position,
     *                where in the inBitsbuf the first char of the first token
     *                of several Unit8Array tokens have matched in normal order,
     *                and writes into inOutRange, too, the number,
     *                this is the position in the inBitsbuf, where the last char of the last token
     *                of several Unit8Array tokens have matched in normal order,
     *                plus 1.
     * @param inBitsbuf
     * @param tokenSetAsBitsbufs
     * @param inOutRange
     * @param lookupStartPos
     * @returns
     */



    getRangeOfTokensSetMatch(
        inBitsbuf,
        tokenSetAsBitsbufs,
        inOutRange,
        lookupStartPos,
        lookupEndPos
    ) {
        let startPos = 0;
        let endPos = 1;
        let positionOfACharInTheInBitsBuf = lookupStartPos;


        // the first iteration is: inBitsBufRange[startPos]; however here is any step, not always just the first.
        let tokenMatched_LastChar_Pos = 0;


        // the position in the inBitsbuf, where the last char of the current token compared matched.
        // searching til the block starts
        let tokensSetPos = 0;
        let token = tokenSetAsBitsbufs[tokensSetPos];


        // to the token var assigned the first token in the tokens set
        let tokenMatched_FirstChar_Pos = 0;


        // the position in the inBitsBuffer, where the matched token has the first char matched.
        let tokenFirstMatched = false;

        for (tokensSetPos = 0; tokensSetPos < tokenSetAsBitsbufs.length; tokensSetPos++) {

            // the next token of the tokens charsets denoting start of some block in the text when parsing.
            token = tokenSetAsBitsbufs[tokensSetPos];


            // trying to match the next token.
            // once the next token did not match,
            // means the entire tokens set did not match,
            // means no match.
            // then starting to match the very first token again,
            // until number of tries variable counterStop: number.
            // when still no match til the end of a bitsbuf of a Range,
            // means no block encountered, this we wanted to find and to exclude from the valid blocks in the inBitsbuf.
            // means the entire block parsed, is valid.
            tokenMatched_FirstChar_Pos = this.firstIndexOf(
                inBitsbuf,
                token,
                positionOfACharInTheInBitsBuf,


                // inBitsBufRange[startPos], later iterations the next match.
                lookupEndPos
            );


            // if the comment block did not start, exit from searching in current range
            // if === false, EXIT TO HANDLE THE NEXT RANGE
            if (tokenMatched_FirstChar_Pos === false) {

                // RESETTING THE MARKER, value false here means did NOT match.
                // after this loop, with this marker we may know, NO match in the entire loop.
                tokenFirstMatched = false;


                // no match, setting values to -1, means no match.
                inOutRange[startPos] = (-1);
                inOutRange[endPos] = (-1);


                // exiting to return false.
                break;
            }


            // todo: check tokens have just one token. then matched, and skip for good))
            // first token in set matched, initializing markers.
            // before, the marker was set false
            // if === false, SET MARKERS AND CONTINUING NEXT TOKEN COMPARE SAME TOKENS SEQUENCE.
            if (tokenFirstMatched === false) {
                tokenFirstMatched = true;
                inOutRange[startPos] = tokenMatched_FirstChar_Pos.valueOf();
            }


            // here we handle the logics, where the start token was matched.
            // just increasing the offset to lookup the next start token in the next iteration
            // on he next position of a character in the inBitsbuf
            // first comment token matched on the start of the file, pos = 0.
            // the length of the token is 1 bytes ({0: "@"})
            // the last position of the token matched is the same first position = 0.
            // however, the range [0,0] like seems denoting a zero len range,
            // and the range indeed has 1 byte length.
            // I set the range then [0,1] and this invokes the impression of a one char long token,
            // however in the programming logics position 1 is the position of the next char,
            // and when the final char in the text of let's say 200 chars length matches,
            // then the range like [")", ";"] [198,200] matched, the real pos of symbol ";" is 199,
            // and the pos 200 is out of bounds in the text of 200 chars length.
            // just to notice this logics.
            // "end" keyword rather to interpret as "the next pos after the last char in the token matched".
            tokenMatched_LastChar_Pos = (tokenMatched_FirstChar_Pos.valueOf() + token.length);
            inOutRange[endPos] = tokenMatched_LastChar_Pos;


            // the start value to lookup from is the next after the token's last char pos in the inBitsbuf.
            positionOfACharInTheInBitsBuf = tokenMatched_LastChar_Pos;
        }

        if (tokenFirstMatched === false) {
            return false;
        }


        // the lposition in the inBitsbuf, where the last char of the tokens set matched.
        let inBitsbufTokensLastCharPos = tokenMatched_LastChar_Pos;


        return inBitsbufTokensLastCharPos;
    }


    /**
     *
     * @param inBitsBuf
     * @param inToken_Uint8Array
     * @param inStartPos
     * @param inEndPos
     * @returns false, when the inToken_Uint8Array was not found,
     *            or the offset in the inBitsBuf Uint8Array of datatype Number,
     *            where, on the entire token match,
     *            the first byte of the inToken_Uint8Array has matched.
     *          For example: the token in the Uint8Array representation, this.textEncoder.encode("@import")
     *          in the .css file like this: "@import url("@alias/styles.css"); "
     *          the token @import has matched entirely.
     *          and the first char matched "@" on the first char in the .css file has the offset 0.
     *          then, the retun value will be 0 of datatype Number.
     *          The return value Number 0 is not the same as the return value "false" of datatype boolean.
     *          The return value "false" means, there was no text, exact as the token, in the inBitsBuf.
     */



    firstIndexOf(
        inBitsBuf,
        inToken_Uint8Array,
        inStartPos,
        inEndPos
    ) {

        // let tokenBitsBuf: Uint8Array = this.textEncoder.encode( inToken );
        let tokenLen = inToken_Uint8Array.byteLength;
        let iterationsNumber = (inEndPos - inStartPos);

        if (iterationsNumber < 1) {
            throw new Error("The end char position to lookup is not over the start position.");
        }

        if (iterationsNumber < tokenLen) {
            return false;
        }
        let matched = false;
        let ix = 0;
        let b = 0;
        let tokenFirstChar = inToken_Uint8Array[0];
        let tokenChar = 0;
        let matchNotStarted = true;
        let theFirstMatchIx = 0;


        // @var offset: the offset of an tokenChar: octet in the token inBitsBuf: Uint8Array.
        let offset = 0;

        for (ix = inStartPos; ix < inEndPos; ix++) {

            // the char of the inBitsBuf: Uint8Array, to compare with the char in a token.
            b = inBitsBuf[ix];


            // did NOT match this next char in the inBitsBuf Uint8Array and the first char of a token.
            // we skip at once to the next char in the inBitsBuf to compare here again.
            if ((matchNotStarted === true) && (b !== tokenFirstChar)) {
                continue;
            }


            // here first chars of the token matched.
            // register to start all tokens symbols compare.
            // and skip to next step, since this symbol already compared.
            if (matchNotStarted === true) {
                offset = 1;
                matchNotStarted = false;


                // on the octet position = ix in the inBitsBuf, a char did match the first time the first char in the token.
                // this will be the start position of the matching token in the inBitsBuf.
                // and this value will be the result of this method,
                // if every char in the token will match the next chars, too, in the inBitsBuf after this octet position = ix;
                theFirstMatchIx = ix;

                if (tokenLen === 1) {

                    // the marker to tell matched true.
                    matched = true;


                    // exiting the loop, no need to compare in the next iteration, since this method .firstIndexOf() all done.
                    break;
                }
                else {

                    // here continue to next chars to compare, since the first char already did match.
                    // and we did set the markers, these mean to compare not just the first char of the token, but every next one by one.
                    continue;
                }
            }


            // the next char in the token is compared with the next char in the
            tokenChar = inToken_Uint8Array[offset];

            if (b === tokenChar) {

                // @var offset: the offset of an tokenChar: octet in the token inBitsBuf: Uint8Array.
                // here the next chars both did match,
                // and we raise the next position of a char in the token to compare with the char in the inBitsBuf.
                offset++;


                // did reach the end of the being compared token,
                // set the marker means DID match true,
                // and exit the loop,
                // after the loop the marker will tell to return the first char position in the inBitsBuf, where after, too, the token did match entirely.
                if (offset === tokenLen) {

                    // the marker to tell matched true.
                    matched = true;


                    // exiting the loop, no need to compare in the next iteration, since this method .firstIndexOf() all done.
                    break;
                }
            }
            else {

                // not all chars in the token matched.
                // the marker resets,
                // and in the next iterations,
                // just the first char of the token will be compared
                // with the every next char in the inBitsBuf.
                matchNotStarted = true;


                // just resetting the position of the first char in the token.
                offset = 0;
            }
        }


        // the only exit outside of the loop before was on did match true.
        // otherwise, all chars were compared til EOF, and the marker matched not set,
        // means NO match.
        if (!matched) {
            return false;
        }


        // DID match true, the position of the first char in the token, matched in the inBitsBuf.
        return theFirstMatchIx;
    }

}


class TemplateRenderer extends EventEmitter {
    EVENT_NAME__AFTER_RENDER;
    tokensParser;
    dataRecords;
    #activeDataRecordId;
    textEncoder;
    textDecoder;



    constructor() {
        super();
        this.EVENT_NAME__AFTER_RENDER = "afterRender";
        this.tokensParser = new TokensParser();
        this.dataRecords = new Array();
        this.#activeDataRecordId = 0;
        this.textEncoder = new TextEncoder();
        this.textDecoder = new TextDecoder("utf8");
    }



    initDataRecord() {
        let dataRecord = new Object();
        dataRecord.isOptimized = false;
        dataRecord.textTemplate = "";
        dataRecord.dataForRendering = new Object();
        dataRecord.bitsbufTemplate = new Uint8Array();
        dataRecord.optimizedBitsbufTemplate = new Array();
        dataRecord.optimizedPlaceholdersEntries = new Object();
        dataRecord.optimizedTemplate = new Array();


        return dataRecord;
    }



    addNewDataRecord() {
        let dataRecord = this.initDataRecord();
        this.dataRecords.push(dataRecord);
        this.#activeDataRecordId = (this.dataRecords.length - 1);
        this.dataRecords[this.#activeDataRecordId].id = this.#activeDataRecordId;


        return this.dataRecords[this.#activeDataRecordId];
    }



    getActiveDataRecord() {
        let dataRecord;

        if (this.#activeDataRecordId === 0) {
            let obj = new Object();
            this.dataRecords.push(obj);
            dataRecord = this.addNewDataRecord();
        }
        else {
            dataRecord = this.dataRecords[this.#activeDataRecordId];
        }


        return dataRecord;
    }



    getActiveDataRecordId() {
        return this.#activeDataRecordId;
    }



    getDataRecordById(id) {
        return this.dataRecords[id];
    }



    setActiveRecordId(id) {
        this.#activeDataRecordId = id;


        return this.dataRecords[id];
    }



    setActiveDataRecord(dataRecord) {
        if (this.#activeDataRecordId === 0) {
            let obj = new Object();
            this.dataRecords.push(obj);
        }
        let id = dataRecord.id;

        if (id === 0) {
            id = this.dataRecords.length;
            dataRecord.id = id;
            this.dataRecords.push(dataRecord);
        }
        else {
            id = dataRecord.id;
            this.dataRecords[id] = dataRecord;
        }
        this.#activeDataRecordId = id;


        return id;
    }



    setTemplate(template) {
        let dataRecord = this.getActiveDataRecord();
        dataRecord.textTemplate = template;


        return this;
    }



    setData(dataForRendering) {
        let dataRecord = this.getActiveDataRecord();
        dataRecord.dataForRendering = dataForRendering;


        return this;
    }



    render() {
        if (this.#activeDataRecordId === 0) {
            throw new Error("No template neither data were set.");
        }
        let dataRecord = this.getActiveDataRecord();

        if (dataRecord.isOptimized === false) {
            this.optimize(dataRecord.id);
            dataRecord = this.dataRecords[dataRecord.id];
        }
        let renderedHtml = this.renderOptimizedToStringDataText(
            dataRecord.id,
            dataRecord.dataForRendering
        );

        if (this.debug) {
            console.log(
                "renderedHtml before afterRender event emitted",
                renderedHtml
            );
        }
        const eventResult = this.emitEvent(
            this.EVENT_NAME__AFTER_RENDER,
            {
                html: renderedHtml,
                data: dataRecord.dataForRendering
            }
        );

        if (eventResult.length > 0) {
            const last = eventResult.length - 1;
            let payloadReturned = null;

            for (let eventResultsStep = last; eventResultsStep > (-1); eventResultsStep--) {
                try {

                    // @ts-ignore
                    payloadReturned = eventResult[eventResultsStep].result.payloadReturned;
                }
                catch (e) { }

                if (!payloadReturned) {
                    continue;
                }
                renderedHtml = payloadReturned.html;
            }

            if (this.debug) {
                console.log(
                    "renderedHtml before afterRender event emitted",
                    eventResult,
                    renderedHtml
                );
            }
        }
        else if (this.debug) {
            console.log("afterRender event did not change html");
        }


        return renderedHtml;
    }


    // the faster method.
    renderOptimizedDataBitsbufs(
        templateDataRecordId,
        dataForRendering
    ) {
        let dataRecord = this.getDataRecordById(templateDataRecordId);
        dataRecord.dataForRendering = dataForRendering;
        let bitsbufsArray = [...dataRecord.optimizedBitsbufTemplate];

        for (let placeholderName in dataRecord.dataForRendering) {
            let placeholderEntries = dataRecord.optimizedPlaceholdersEntries[placeholderName];


            // @ts-ignore
            let placehoder = dataRecord.dataForRendering[placeholderName];

            for (let i of placeholderEntries) {
                bitsbufsArray[i] = placehoder;
            }
        }


        return bitsbufsArray;
    }



    renderOptimizedToStringDataText(
        templateDataRecordId,
        dataForRendering
    ) {
        let dataRecord = this.getDataRecordById(templateDataRecordId);
        dataRecord.dataForRendering = dataForRendering;
        let textBlocks = this.renderOptimizedTextBlocks(
            templateDataRecordId,
            dataRecord.dataForRendering
        );
        let renderedText = textBlocks.join("");


        return renderedText;
    }



    renderOptimizedToStringDataBitsbufs(
        templateDataRecordId,
        dataForRendering
    ) {
        let dataRecord = this.getDataRecordById(templateDataRecordId);
        dataRecord.dataForRendering = dataForRendering;
        let bitsbufsArray = this.renderOptimizedDataBitsbufs(
            templateDataRecordId,
            dataRecord.dataForRendering
        );
        let bitsbufsArrayLen = bitsbufsArray.length;
        let textBlocks = new Array(bitsbufsArrayLen);
        let i = 0;

        for (i = 0; i < bitsbufsArrayLen; i++) {
            let bitsbufElem = bitsbufsArray[i];

            if (typeof bitsbufElem === "string") {
                textBlocks[i] = bitsbufElem;
            }
            else {
                textBlocks[i] = this.textDecoder.decode(bitsbufElem);
            }
        }
        let renderedText = textBlocks.join("");


        return renderedText;
    }


    // the way to improve:
    // after optimization, create once dataRecord.optimizedBitsbufTemplate of texts, so not to decode to strings.
    renderOptimizedTextBlocks(
        templateDataRecordId,
        dataForRendering


    // { key: text }
    ) {
        let dataRecord = this.getDataRecordById(templateDataRecordId);
        dataRecord.dataForRendering = dataForRendering;
        let bitsbufsArray = [...dataRecord.optimizedBitsbufTemplate];
        let textBlocks = new Array();
        let bitsbufElem = new Uint8Array();

        for (let i = 0; i < bitsbufsArray.length; i++) {
            bitsbufElem = bitsbufsArray[i];
            textBlocks[i] = this.textDecoder.decode(bitsbufElem);
        }

        for (let placeholderName in dataRecord.dataForRendering) {
            let placeholderEntries = dataRecord.optimizedPlaceholdersEntries[placeholderName];


            // @ts-ignore
            let placehoder = dataRecord.dataForRendering[placeholderName];

            for (let i of placeholderEntries) {
                textBlocks[i] = placehoder;
            }
        }


        return textBlocks;
    }



    optimize(templateDataRecordId) {
        let maxIterationsNumber = 1200;
        let dataRecord = this.getDataRecordById(templateDataRecordId);

        if (dataRecord.bitsbufTemplate.byteLength === 0) {
            dataRecord.bitsbufTemplate = this.tokensParser.textEncoder.encode(dataRecord.textTemplate);
        }
        let end = dataRecord.bitsbufTemplate.length;
        let templateLookupRange = [0, end];
        let placeholdersNames = Object.keys(dataRecord.dataForRendering);
        let severalTokensSets = placeholdersNames.map((placeholderName) => {
            let placeholderMarkup = ["{{ ", placeholderName, " }}"].join("");


            return [placeholderMarkup];
        });
        let bitsbufsRanges = new Array(1);
        bitsbufsRanges[0] = templateLookupRange;
        let inOutRanges_WithoutTokenizedAreas = new Array();
        let inOutRanges_TokensSetsMatched = new Array(placeholdersNames.length);
        let numberOfPlaceholdersMatched = this.tokensParser
            .parseAroundSeveralTokensSets(
                dataRecord.bitsbufTemplate,
                bitsbufsRanges,


                // datatype explained: [ [startRef: number, endRef: number], [startRef: number, endRef: number], ... ];
                severalTokensSets,


                // where one tokensSet is array of datatype string[]
                inOutRanges_WithoutTokenizedAreas,
                inOutRanges_TokensSetsMatched,
                maxIterationsNumber
            );

        for (let placeholderId = 0; placeholderId < placeholdersNames.length; placeholderId++) {
            let placeholderName = placeholdersNames[placeholderId];
            let tokensMatchedRanges = inOutRanges_TokensSetsMatched[placeholderId];

            for (let tokenId = 0; tokenId < tokensMatchedRanges.length; tokenId++) {
                let templateRecord = new Object();
                templateRecord.range = [...tokensMatchedRanges[tokenId]];
                templateRecord.placeholderName = placeholderName;
                dataRecord.optimizedTemplate.push(templateRecord);
            }
        }
        let fixedTemplateRecord = new Object();

        for (let templateRange of inOutRanges_WithoutTokenizedAreas) {
            fixedTemplateRecord = new Object();
            fixedTemplateRecord.range = templateRange;
            fixedTemplateRecord.placeholderName = "_";
            dataRecord.optimizedTemplate.push(fixedTemplateRecord);
        }
        dataRecord.optimizedPlaceholdersEntries = new Object();

        for (let placeholderId = 0; placeholderId < placeholdersNames.length; placeholderId++) {
            let placeholderName = placeholdersNames[placeholderId];
            dataRecord.optimizedPlaceholdersEntries[placeholderName] = new Array();
        }
        let optimizedRecords = this.orderedRecords(dataRecord.optimizedTemplate);
        dataRecord.optimizedBitsbufTemplate = new Array(optimizedRecords.length);

        for (let i = 0; i < optimizedRecords.length; i++) {
            let record = optimizedRecords[i];
            let placeholderName = record.placeholderName;
            let bitsbuf = new Uint8Array();

            if (placeholderName === "_") {
                bitsbuf = dataRecord.bitsbufTemplate.subarray(
                    record.range[0],
                    record.range[1]
                );
                dataRecord.optimizedBitsbufTemplate[i] = bitsbuf;
            }
            else {
                dataRecord.optimizedPlaceholdersEntries[placeholderName].push(i);
            }
        }
        dataRecord.optimizedTemplate = [...optimizedRecords];
        dataRecord.isOptimized = true;


        return numberOfPlaceholdersMatched;
    }



    orderedRecords(inRecords) {
        let records = inRecords.sort((recordA, recordB) => {
            let startA = recordA.range[0];
            let startB = recordB.range[0];

            if (startA === startB) {
                return (0);
            }
            else if (startA > startB) {
                return (1);
            }
            else {
                return (-1);
            }
        });


        return [...records];
    }


    // old method String.replace() in loop over all charrs of the template every loop iterations.
    replaceTemplateRendererWithDataForRendering() {
        let dataRecord = this.getActiveDataRecord();
        let renderedHtml_1 = "";
        let renderedHtml_2 = dataRecord.textTemplate;

        for (const placeholderName in dataRecord.dataForRendering) {
            renderedHtml_1 = renderedHtml_2;
            const stringToReplace = `{{ ${placeholderName} }}`;


            // @ts-ignore
            let valueToSet = dataRecord.dataForRendering[placeholderName];

            if (!valueToSet) {
                valueToSet = "";
            }
            renderedHtml_2 = renderedHtml_1.replace(stringToReplace, valueToSet);
        }


        return renderedHtml_2;
    }
}


class ArrayOrObjectPackage {
    static JsonDataType = {
        ARRAY: 1,
        OBJECT: 2,
        STRING: 3,
        NUMBER: 4,
        BOOLEAN: 5,
        NO_SUBTREE: 6
    };



    static getDataTypeStringAndConst(value) {
        const dataTypeString = Array.isArray(value) ? "array" : (typeof value);
        const dataType = ArrayOrObjectPackage.JsonDataType[dataTypeString.toUpperCase()];


        return {
            dataTypeString,
            dataType
        };
    }



    static getDataType(value) {
        const dataTypeString = Array.isArray(value) ? "array" : (typeof value);
        const dataType = ArrayOrObjectPackage.JsonDataType[dataTypeString.toUpperCase()];


        return dataType;
    }



    static getArrayOrObjectItemsAmount(isArray, arrayOrObject) {
        let itemsAmount = 0;
        let objectKeys = null;

        if (isArray === 1) {
            itemsAmount = arrayOrObject.length;
        }
        else {
            objectKeys = Object.keys(arrayOrObject);
            itemsAmount = objectKeys.length;
        }


        return {
            itemsAmount,
            objectKeys
        };
    }



    static iterateOverArrayOrObject(
        dataType,
        arrayOrObject,
        callback,
        callbackPayload,
        objectKeys
    ) {
        const isArray = ((dataType === ArrayOrObjectPackage.JsonDataType.ARRAY) ? 1 : 0);
        const callbackResult = ArrayOrObjectPackage.iterateOverArrayOrObjectDefined(
            isArray,
            arrayOrObject,
            callback,
            callbackPayload,
            objectKeys
        );


        return callbackResult;
    }



    static iterateOverArrayOrObjectDefined(
        isArray,
        arrayOrObject,
        callback,
        callbackPayload,
        objectKeys
    ) {

        // expects isArray = 1 true
        let loopCounter = 0;
        let arrayElement = {};
        let subtreeKeys = [];
        let subtreeValues = [];
        let loopPropertyName = "";
        let loopPropertyValue = {};
        let arrayOrObjectItemsAmount = 1;
        let callbackResult = null;

        if (isArray === 1) {

            // subtree type is array
            loopPropertyName = "";
            arrayOrObjectItemsAmount = arrayOrObject.length;

            for (loopCounter = 0; loopCounter < arrayOrObjectItemsAmount; loopCounter++) {
                arrayElement = arrayOrObject[loopCounter];
                callbackResult = callback(
                    isArray,
                    loopCounter,
                    arrayElement,
                    loopCounter,
                    arrayOrObject,
                    callbackResult,
                    callbackPayload
                );
            }
        }
        else {

            // subtree type is object
            subtreeKeys = (objectKeys !== null) ? objectKeys : Object.keys(arrayOrObject);
            subtreeValues = Object.values(arrayOrObject);
            arrayOrObjectItemsAmount = subtreeKeys.length;

            for (loopCounter = 0; loopCounter < arrayOrObjectItemsAmount; loopCounter++) {
                loopPropertyName = subtreeKeys[loopCounter];
                loopPropertyValue = subtreeValues[loopCounter];
                callbackResult = callback(
                    isArray,
                    loopCounter,
                    loopPropertyValue,
                    loopPropertyName,
                    arrayOrObject,
                    callbackResult,
                    callbackPayload
                );
            }
        }


        return callbackResult;
    }
}


class TreeConstants {
    static RenderingMode = {
        Ease: 1,
        Conf: 2
    };
    static NodesOpenedMode = {
        ALL_SHOWN: 1,
        JSON_DATA_DEFINED: 2,
        ALL_HIDE: 3
    };
    static TreeCssClassNames = {
        MAIN_CLASS_NAME: "tree",
        CLASS_NAME_WITH_ICONS: "with-icons",
        CLASS_OPENED: "toggle-with-subtree-opened",
        CLASS_WITHOUT_SUBTREE: "toggle-without-subtree",
        CLASS_ICON_SHOW: "icon-show",
        CLASS_ICON_HIDE: "icon-hide",
        CLASS_ICON_TAG_IMG: "icon-tag-img",
        CLASS_AND_ID__CONTEXT_MENU: "context-menu-container",
        CLASS_DATATYPE_OBJECT: "holder-datatype--object",
        CLASS_DATATYPE_ARRAY: "holder-datatype--array",
        CLASS_DATATYPE_STRING: "holder-datatype--string",
        CLASS_DATATYPE_NUMBER: "holder-datatype--number",
        CLASS_DATATYPE_BOOLEAN: "holder-datatype--boolean",
        PREFIX__CLASS_DATATYPE: "holder-datatype--"
    };
    static TreeEventsNames = {
        EVENT_NAME__BEFORE_RENDER_ONE_NODE: "beforeRenderOneNode",
        EVENT_NAME__AFTER_RENDER_ONE_NODE: "afterRenderOneNode",
        EVENT_NAME__TREE_NODE_EXPAND_BUTTON__CLICK: "openButtonClick",
        EVENT_NAME__TREE_NODE_LABEL__CLICK: "treeNodeLabelClick"
    };
    static TEMPLATE__TREE_HTML_NODE = `
<li
    data-id="{{ dataId }}"
    data-holder-id="{{ dataHolderId }}"
    data-order="{{ dataOrder }}"
    {{ cssClasses }}>

    <pre class="jstree-html-node" data-json="{{ dataJson }}">
        <pre class="open-button  {{ openButtonStateClassName }}">
            <pre class="opened"></pre>
            <pre class="closed"></pre>
            <pre class="without-subtree"></pre>
            <pre class="animated"></pre>
        </pre>

        <pre class="jstree-html-node-holder-icon {{ iconShowClassName }}">
            <img src="{{ iconSrc }}" alt="Mini image {{ dataId }}" />
        </pre>

        <a href="{{ hyperlink }}" class="jstree-html-node-label">{{ labelText }}</a>
    </pre>

    <ul></ul>
</li>
        `;
    static Defaults = {
        debug: false,
        renderingMode: TreeConstants.RenderingMode.Ease,
        nodesWithIcons: true,
        nodesOpenedMode: TreeConstants.NodesOpenedMode.ALL_HIDE,
        isModifiable: false,
        dataTypesCssClassesEnabled: true
    };
}


class TreeAdapter {
    conf;
    nodesWithIcons;
    nodesOpenedMode;
    dataTypesCssClassesEnabled;



    constructor() {
        this.conf = new TreeConf();
        this.nodesWithIcons = TreeConstants.Defaults.nodesWithIcons;
        this.nodesOpenedMode = TreeConstants.Defaults.nodesOpenedMode;
        this.dataTypesCssClassesEnabled = TreeConstants.Defaults.dataTypesCssClassesEnabled;
    }
}


class TreeAdapterModeEase extends TreeAdapter {

    getSubtreeNodeToRender(
        loopPropertyValue,
        loopPropertyKey
    ) {
        const subtreeJsonNode = { [loopPropertyKey]: loopPropertyValue };


        return subtreeJsonNode;
    }



    getDataForRendering(
        node,
        flatNodeClone,
        dataTypeString,
        nodeHasSubtree
    ) {
        const key = Object.keys(node)[0];
        const value = node[key] ?? "";
        let openButtonClassName = "";
        let labelText = `"${key}"`;

        if (!nodeHasSubtree) {
            openButtonClassName = TreeConstants.TreeCssClassNames.CLASS_WITHOUT_SUBTREE;
            const serializedJsonValue = this.escapeHTMLForAttribute(JSON.stringify(value));
            labelText = `"${key}": ${serializedJsonValue}`;
        }
        else if (this.nodesOpenedMode === TreeConstants.NodesOpenedMode.ALL_SHOWN) {
            openButtonClassName = TreeConstants.TreeCssClassNames.CLASS_OPENED;
        }
        const cssClasses = (this.dataTypesCssClassesEnabled === true) ? this.getTreeNodeCssClasses(dataTypeString, value) : "";
        const dataForRendering = {
            iconSrc: "",
            iconShowClassName: this.nodesWithIcons ? "icon-show mode-ease" : "icon-hide",
            labelText,
            hyperlink: "javascript: void(0);",
            cssClasses,
            dataId: "",
            dataHolderId: "",
            dataOrder: "",
            dataJson: this.escapeHTMLForAttribute(JSON.stringify(flatNodeClone)),
            openButtonStateClassName: openButtonClassName,
            hasSubtree: nodeHasSubtree
        };


        return dataForRendering;
    }



    getTreeNodeCssClasses__dataTypesCssClassesEnabled(_dataTypeString, _node) {
        const cssClassesArray = [
            ("class=\""),
            (TreeConstants.TreeCssClassNames.PREFIX__CLASS_DATATYPE),
            (_dataTypeString),
            ("\"")
        ];
        const cssClasses = cssClassesArray.join("");


        return cssClasses;
    }



    getTreeNodeCssClasses__dataTypesCssClassesDisabled(_dataTypeString, _node) {
        throw new Error("Method not implemented.");
    }


    // dummy placeholders
    escapeHTMLForAttribute(_arg) {
        throw new Error("Method not implemented.");
    }



    getTreeNodeCssClasses(_dataTypeString, _value) {
        throw new Error("Method not implemented.");
    }
}


class TreeAdapterModeConf extends TreeAdapter {

    getSubtreeNodeToRender(
        _loopPropertyValue,
        _loopPropertyKey
    ) {
        return _loopPropertyValue;
    }



    getDataForRendering(
        node,
        flatNodeClone,
        dataTypeString,
        hasSubtree
    ) {
        const SYMBOL_BACKGROUND_SPACE = String.fromCharCode(32);
        let openButtonClassName = "";

        if (!hasSubtree) {
            openButtonClassName = TreeConstants.TreeCssClassNames.CLASS_WITHOUT_SUBTREE;


            // @ts-ignore
        }
        else if ((this.nodesOpenedMode === TreeConstants.NodesOpenedMode.ALL_SHOWN)) {
            openButtonClassName = TreeConstants.TreeCssClassNames.CLASS_OPENED;
        }
        else if ((node[this.conf.NODE__OPENED] === true)
            && (this.nodesOpenedMode === TreeConstants.NodesOpenedMode.JSON_DATA_DEFINED)) {
            openButtonClassName = TreeConstants.TreeCssClassNames.CLASS_OPENED;
        }
        const cssClasses = this.getTreeNodeCssClasses(dataTypeString, node);
        let confImageSrc = node[this.conf.NODE_ICON__SRC] || "";
        let isMiniImagesTagShown = this.nodesWithIcons;
        let isConfImageSrc = (confImageSrc.length !== 0);
        confImageSrc = (isMiniImagesTagShown && isConfImageSrc) ? confImageSrc : "";
        isConfImageSrc = (isMiniImagesTagShown && isConfImageSrc);
        let isMiniImageTagImg = (isMiniImagesTagShown && isConfImageSrc);
        let tagImageCssClassnames = new Array();

        if (isMiniImagesTagShown) {
            tagImageCssClassnames.push(TreeConstants.TreeCssClassNames.CLASS_ICON_SHOW);
        }
        else {
            tagImageCssClassnames.push(TreeConstants.TreeCssClassNames.CLASS_ICON_HIDE);
        }

        if (isMiniImageTagImg) {
            tagImageCssClassnames.push(TreeConstants.TreeCssClassNames.CLASS_ICON_TAG_IMG);
        }
        const dataForRendering = {
            dataId: node[this.conf.NODE__ID],
            dataHolderId: node[this.conf.NODE__HOLDER_ID],
            dataOrder: node[this.conf.NODE__ORDER],
            dataJson: this.escapeHTMLForAttribute(JSON.stringify(flatNodeClone)),
            openButtonStateClassName: openButtonClassName,
            cssClasses,
            iconSrc: confImageSrc,
            iconShowClassName: tagImageCssClassnames.join(SYMBOL_BACKGROUND_SPACE),
            labelText: node[this.conf.NODE_LABEL__TEXT],
            hyperlink: node[this.conf.NODE__HYPERLINK] ?? "javascript: void(0);",
            hasSubtree
        };


        return dataForRendering;
    }



    getTreeNodeCssClasses__dataTypesCssClassesEnabled(dataTypeString, node) {
        const cssClassesNodeValue = node[this.conf.NODE__CSS_CLASS_NAME];
        const cssClassesArray = [
            ("class=\""),
            (cssClassesNodeValue),
            (" "),
            (TreeConstants.TreeCssClassNames.PREFIX__CLASS_DATATYPE),
            (dataTypeString),
            ("\"")
        ];
        const cssClasses = cssClassesArray.join("");


        return cssClasses;
    }



    getTreeNodeCssClasses__dataTypesCssClassesDisabled(_dataTypeString, _node) {
        const cssClassesNodeValue = _node[this.conf.NODE__CSS_CLASS_NAME];
        const cssClassesArray = [
            ("class=\""),
            (cssClassesNodeValue),
            ("\"")
        ];
        const cssClasses = cssClassesArray.join("");


        return cssClasses;
    }


    // dummy placeholders
    escapeHTMLForAttribute(_arg) {
        throw new Error("Method not implemented.");
    }



    getTreeNodeCssClasses(_dataTypeString, _value) {
        throw new Error("Method not implemented.");
    }
}


class TreeConf {
    NODE_ICON__SRC;
    NODE_LABEL__TEXT;
    SUBTREE;
    NODE__ID;
    NODE__HOLDER_ID;
    NODE__PATH;
    NODE__ORDER;
    NODE__HYPERLINK;
    NODE__OPENED;
    NODE__CSS_CLASS_NAME;
    NODE__ART;



    constructor() {
        this.NODE_ICON__SRC = "icon";
        this.NODE_LABEL__TEXT = "label";
        this.SUBTREE = "subtree";
        this.NODE__ID = "id";
        this.NODE__HOLDER_ID = "holderId";
        this.NODE__PATH = "PATH";
        this.NODE__ORDER = "order";
        this.NODE__HYPERLINK = "href";
        this.NODE__OPENED = "opened";
        this.NODE__CSS_CLASS_NAME = "cssClassName";
        this.NODE__ART = "art";
    }
}


class Tree extends ImprovedRenderEventEmitter {
    debug;
    mainHtmlNodeId;
    mainHolderHtmlNode;
    url;
    data;
    conf;
    subtreeLength;
    subtreeLengthDeep;
    templateRenderer;
    contextMenuJSClass;
    renderingMode;
    nodesWithIcons;
    nodesOpenedMode;
    isModifiable;
    dataTypesCssClassesEnabled;
    adapter;



    constructor() {
        super();
        this.debug = TreeConstants.Defaults.debug;
        this.mainHtmlNodeId = "";
        this.mainHolderHtmlNode = null;
        this.url = "";
        this.data = null;
        this.conf = new TreeConf();
        this.subtreeLength = 0;
        this.subtreeLengthDeep = 0;
        this.templateRenderer = new TemplateRenderer();


        /* this.templateRenderer
                .addThisClassEventListener (
                    this.templateRenderer.EVENT_NAME__AFTER_RENDER,
                    // @ts-ignore
                    (payload: {html, data}) => {
                        let renderedHtml: any = payload.html;
                        let value: any = null;

                        if (!payload.data.hasSubtree) {
                            renderedHtml = payload.html.replace('<ul></ul>', '');
                            value = 'html modified';
                        }

                        const payloadReturned: any = {...payload, html: renderedHtml};
                        return {payloadReturned, value};
                    }
                ); */
        this.contextMenuJSClass = null;


        // DEFAULT VALUES ARE FROM CONSTANTS CLASS
        this.setDebug(TreeConstants.Defaults.debug);
        this.renderingMode = TreeConstants.Defaults.renderingMode;
        this.nodesWithIcons = TreeConstants.Defaults.nodesWithIcons;
        this.nodesOpenedMode = TreeConstants.Defaults.nodesOpenedMode;
        this.isModifiable = TreeConstants.Defaults.isModifiable;
        this.dataTypesCssClassesEnabled = TreeConstants.Defaults.dataTypesCssClassesEnabled;
        this.adapter = new TreeAdapterModeEase();
    }



    setDebug(debug) {

        // optional method
        super.setDebug(debug);
        this.templateRenderer.setDebug(debug);
        this.debug = debug;


        return this;
    }



    setNodesWithIcons(withIcons) {

        // optional method
        this.nodesWithIcons = withIcons;


        return this;
    }



    setNodesOpenedMode(openedMode) {

        // optional method
        this.nodesOpenedMode = openedMode;


        return this;
    }



    setUrl(url) {

        // optional method
        this.url = url;


        return this;
    }



    setMainHtmlNodeId(mainHtmlNodeId) {

        // required method
        this.mainHtmlNodeId = mainHtmlNodeId;


        return this;
    }



    setConf(conf) {

        // optional method
        this.conf = conf;


        return this;
    }



    setModifiable(isModifiable) {

        // optional method
        this.isModifiable = isModifiable;


        return this;
    }



    setRenderingMode(mode) {

        // optional method
        this.renderingMode = mode;


        return this;
    }



    setDataTypesCssClassesEnabled(dataTypesCssEnabled) {
        this.dataTypesCssClassesEnabled = dataTypesCssEnabled;


        return this;
    }



    load(url) {
        if (url && url.length) {
            this.url = url;
        }

        if (!this.url || !this.mainHtmlNodeId) {
            throw new Error("No url set");
        }
        fetch(this.url)
            .then((response) => response.json())
            .then((json) => {
                this.render(json);
            });


        return this;
    }



    adaptRenderingModeSubcalls() {
        if (this.renderingMode === TreeConstants.RenderingMode.Conf) {
            this.adapter = new TreeAdapterModeConf();

            if (this.dataTypesCssClassesEnabled === true) {
                this.getTreeNodeCssClasses = this.adapter.getTreeNodeCssClasses__dataTypesCssClassesEnabled.bind(this);
            }
            else {
                this.getTreeNodeCssClasses = this.adapter.getTreeNodeCssClasses__dataTypesCssClassesDisabled.bind(this);
            }
        }
        else if (this.renderingMode === TreeConstants.RenderingMode.Ease) {
            this.adapter = new TreeAdapterModeEase();

            if (this.dataTypesCssClassesEnabled === true) {
                this.getTreeNodeCssClasses = this.adapter.getTreeNodeCssClasses__dataTypesCssClassesEnabled.bind(this);
            }
            else {

                // this.getTreeNodeCssClasses = this.getTreeNodeCssClasses__dataTypesCssClassesDisabled__renderingModeConf.bind(this);
            }
        }
        this.getSubtreeNodeToRender = this.adapter.getSubtreeNodeToRender.bind(this);
        this.getDataForRendering = this.adapter.getDataForRendering.bind(this);
    }



    reRender() {
        this.render(this.data);


        return this;
    }



    render(nodes) {
        if (nodes) {
            this.data = nodes;
        }

        if (!this.data
            || !this.conf) {
            throw new Error(`Empty: data ${this.data} or conf ${this.conf}`);
        }
        this.mainHolderHtmlNode = document.getElementById(this.mainHtmlNodeId);

        if (!this.mainHolderHtmlNode) {
            throw new Error("Tree holder html node ID did not match any html node in this html doc.");
        }
        this.adaptRenderingModeSubcalls();


        // set main css class name to the main tree holder html node
        if (this.mainHolderHtmlNode.classList
            && !this.mainHolderHtmlNode.classList.contains(TreeConstants.TreeCssClassNames.MAIN_CLASS_NAME)) {
            this.mainHolderHtmlNode.classList.add(TreeConstants.TreeCssClassNames.MAIN_CLASS_NAME);
        }
        else if (!this.mainHolderHtmlNode.classList) {
            this.mainHolderHtmlNode.className = (TreeConstants.TreeCssClassNames.MAIN_CLASS_NAME);
        }

        if (this.nodesWithIcons === true) {
            this.mainHolderHtmlNode.classList.add(TreeConstants.TreeCssClassNames.CLASS_NAME_WITH_ICONS);
        }
        else {
            this.mainHolderHtmlNode.classList.remove(TreeConstants.TreeCssClassNames.CLASS_NAME_WITH_ICONS);
        }


        // add an html holder node for subtree html nodes
        const ul = document.createElement("UL");


        // get datatype of the main json data node
        const dataType = ArrayOrObjectPackage.getDataType(nodes);
        let isArray = 0;

        if (dataType === ArrayOrObjectPackage.JsonDataType.ARRAY) {
            isArray = 1;
        }
        else if (dataType !== ArrayOrObjectPackage.JsonDataType.OBJECT) {
            throw new Error("Arrays or Objects supported. This JSON Data is not iterable.");
        }


        // get info on subtree nodes amount
        const { itemsAmount, objectKeys } = ArrayOrObjectPackage.getArrayOrObjectItemsAmount(isArray, this.data);
        const subtreeNodesCount = itemsAmount;


        // exit throwing exception, if the tree json data is empty
        if (subtreeNodesCount === 0) {
            throw new Error("Tree json data is empty.");
        }
        const flatNodeHolderClone = { _pathArray: ["this.data"] };
        let subtreeRenderResult;

        if (this.renderingMode === TreeConstants.RenderingMode.Conf) {
            if (isArray === 1) {
                subtreeRenderResult = this.renderSubtree(
                    isArray,
                    this.data,
                    flatNodeHolderClone,
                    objectKeys,
                    ul
                );


                // @ts-ignore
                this.subtreeLength = subtreeNodesCount;


                // @ts-ignore
                this.subtreeLengthDeep = subtreeRenderResult;
            }
            else if (isArray === 0) {
                const isTreeItem = this.getInModeConfDataNodeIsTreeItem(this.data);


                // the root json data node is the tree item data node
                if (isTreeItem) {
                    const renderResult = this.renderOneTreeNode(
                        this.data,
                        0,
                        "Top",
                        { _pathArray: ["this.data"] },
                        ul
                    );
                    const { currentNodeSubtreeLength } = renderResult;
                    this.data = renderResult.node;


                    // @ts-ignore
                    this.subtreeLength = subtreeNodesCount;


                    // @ts-ignore
                    this.subtreeLengthDeep = currentNodeSubtreeLength;
                }
                else {

                    // the root json data node is the associative array of tree item data nodes, suggested, if not so, then will not be rendered.
                    subtreeRenderResult = this.renderSubtree(
                        isArray,
                        this.data,
                        flatNodeHolderClone,
                        objectKeys,
                        ul
                    );


                    // @ts-ignore
                    this.subtreeLength = subtreeNodesCount;


                    // @ts-ignore
                    this.subtreeLengthDeep = subtreeRenderResult;
                }
            }
        }
        else if (this.renderingMode === TreeConstants.RenderingMode.Ease) {
            const renderResult = this.renderOneTreeNode(
                { "Json Root": this.data },
                0,
                "Top",
                { _pathArray: ["this.data"] },
                ul
            );
            const { currentNodeSubtreeLength } = renderResult;


            // this.data = renderResult.node[0];
            // @ts-ignore
            this.subtreeLength = subtreeNodesCount;


            // @ts-ignore
            this.subtreeLengthDeep = currentNodeSubtreeLength;
        }

        if (this.debug) {
            console.log("Tree.data", this.data);
        }
        this.mainHolderHtmlNode.append(ul);


        // all eventsHandlers, assigned with addJSTreeEventListener,
        // here will be attached to one DOM event listener
        this.addJSTreeEventListeners();


        return this;
    }



    checkDataNodeSubtree(node) {
        let hasSubtree = false;
        let subtreeJsonNodes = null;

        if (this.renderingMode === TreeConstants.RenderingMode.Conf) {
            subtreeJsonNodes = node[this.conf.SUBTREE];
        }
        else if (this.renderingMode === TreeConstants.RenderingMode.Ease) {
            subtreeJsonNodes = Object.values(node)[0];
        }
        const { dataTypeString, dataType } = ArrayOrObjectPackage.getDataTypeStringAndConst(subtreeJsonNodes);
        const isArray = ((dataType === ArrayOrObjectPackage.JsonDataType.ARRAY) ? 1 : 0);

        if ((!subtreeJsonNodes)
            || (subtreeJsonNodes.length === 0)
            || ((dataType !== ArrayOrObjectPackage.JsonDataType.ARRAY)
                && (dataType !== ArrayOrObjectPackage.JsonDataType.OBJECT))) {
            return {
                isArray,
                subtreeNodeDataType: dataType,
                subtreeNodeDataTypeString: dataTypeString,
                hasSubtree,
                subtreeJsonNodes,
                objectKeys: null
            };
        }
        const { itemsAmount, objectKeys } = ArrayOrObjectPackage.getArrayOrObjectItemsAmount(isArray, subtreeJsonNodes);
        hasSubtree = (itemsAmount !== 0);


        return {
            isArray,
            subtreeNodeDataType: dataType,
            subtreeNodeDataTypeString: dataTypeString,
            hasSubtree,
            subtreeJsonNodes,
            objectKeys
        };
    }



    renderSubtree(
        isArray,
        subtreeNodes,
        flatNodeHolderClone,
        objectKeys,
        subtreeHtmlHolder
    ) {
        const renderSubtreeResult = ArrayOrObjectPackage.iterateOverArrayOrObjectDefined(
            isArray,
            subtreeNodes,
            this.renderSubtreeCallback.bind(this),
            {
                subtreeHtmlHolder,
                flatNodeHolderClone
            },
            objectKeys
        );


        return renderSubtreeResult;
    }



    renderSubtreeCallback(
        _isArray,
        loopCounter,
        loopPropertyValue,
        loopPropertyKey,
        _arrayOrObject,
        previousCallbackResult,
        callbackPayload
    ) {
        let currentNodeSubtreeLength = (previousCallbackResult) || 0;
        const { subtreeHtmlHolder, flatNodeHolderClone } = callbackPayload;
        const subtreeJsonNode = this.getSubtreeNodeToRender(
            loopPropertyValue,
            loopPropertyKey
        );


        // RENDERING ONE TREE NODE
        const renderResult = this.renderOneTreeNode(
            subtreeJsonNode,
            loopCounter,
            loopPropertyKey,
            flatNodeHolderClone,
            subtreeHtmlHolder
        );
        currentNodeSubtreeLength += renderResult.currentNodeSubtreeLength;


        return currentNodeSubtreeLength;
    }



    renderOneTreeNode(
        node,
        nodePosition,
        nodeKey,
        flatNodeHolderClone,
        holder
    ) {
        if (this.debug) {
            console.log(node);
        }
        const nodeClone = this.updateDataNodeIdAndPath(
            node,
            nodePosition,
            nodeKey,
            flatNodeHolderClone,
            holder
        );
        const { isArray, subtreeNodeDataTypeString, hasSubtree, subtreeJsonNodes, objectKeys } = this.checkDataNodeSubtree(node);


        // TODO: EXTENSIBILITY FEATURE
        let dataForRendering = this.getDataForRendering(
            node,
            nodeClone,
            subtreeNodeDataTypeString,
            hasSubtree
        );
        const eventBeforeRenderOneNodePayload = {
            "eventName": TreeConstants.TreeEventsNames.EVENT_NAME__BEFORE_RENDER_ONE_NODE,
            "dataForRendering": dataForRendering
        };
        const eventBeforeRenderResultsArray = this.emitEvent(
            TreeConstants.TreeEventsNames.EVENT_NAME__BEFORE_RENDER_ONE_NODE,
            eventBeforeRenderOneNodePayload
        );
        const eventResultsLength = eventBeforeRenderResultsArray.length;
        let lastEventRenderResultId = 0;
        let lastEventResult = new Object();

        if ((eventResultsLength >= 1) && lastEventResult && lastEventResult.result) {
            lastEventRenderResultId = (eventResultsLength - 1);
            lastEventResult = eventBeforeRenderResultsArray[lastEventRenderResultId];


            //@ts-ignore
            dataForRendering = lastEventResult.result.value;
        }
        const nodeHtml = this.templateRenderer
            .setTemplate(TreeConstants.TEMPLATE__TREE_HTML_NODE)


            // @ts-ignore
            .setData(dataForRendering)
            .render();
        holder.insertAdjacentHTML("beforeend", nodeHtml);


        // @ts-ignore
        const holderLiItems = holder.getElementsByTagName("LI");
        const li = holderLiItems.item(holderLiItems.length - 1);

        if (li === null) {
            throw new Error("Rendiring broken, wrong html structure built.");
        }
        const eventAfterRenderOneNodePayload = {
            "eventName": TreeConstants.TreeEventsNames.EVENT_NAME__AFTER_RENDER_ONE_NODE,
            "treeHtmlNode": li,
            "treeItemJson": nodeClone
        };

        if (!hasSubtree) {
            this.emitEvent(
                TreeConstants.TreeEventsNames.EVENT_NAME__AFTER_RENDER_ONE_NODE,
                eventAfterRenderOneNodePayload
            );


            return {
                currentNodeSubtreeLength: 0,
                node: nodeClone
            };
        }
        const ul = li.getElementsByTagName("UL")[0];


        // @ts-ignore
        if (this.nodesOpenedMode === TreeConstants.NodesOpenedMode.ALL_HIDE) {
            ul.style.display = "none";
        }
        else if ((!node[this.conf.NODE__OPENED])
            && (this.nodesOpenedMode === TreeConstants.NodesOpenedMode.JSON_DATA_DEFINED)) {
            ul.style.display = "none";
        }
        else if ((node[this.conf.NODE__OPENED] === true)
            && (this.nodesOpenedMode === TreeConstants.NodesOpenedMode.JSON_DATA_DEFINED)) {
            ul.style.display = "block";
        }
        else if (this.nodesOpenedMode === TreeConstants.NodesOpenedMode.ALL_SHOWN) {
            ul.style.display = "block";
        }
        const subtreeRenderResult = this.renderSubtree(
            isArray,
            subtreeJsonNodes,
            nodeClone,
            objectKeys,
            ul
        );
        this.emitEvent(
            TreeConstants.TreeEventsNames.EVENT_NAME__AFTER_RENDER_ONE_NODE,
            eventAfterRenderOneNodePayload
        );


        return {
            currentNodeSubtreeLength: subtreeRenderResult.currentNodeSubtreeLength,
            node: null


            // CHECK OUT WHETHER BOKEN WHEN NOW NULL
        };
    }


    // TEMPORARY IMPL TO KEEP POINTERS TO JSON DATA NODES IN HTML TREE NODES IN HTML NODE DATA ATTRIBUTES
    updateDataNodeIdAndPath(
        node,
        nodePosition,
        nodeKey,
        flatNodeHolderClone,
        _holder
    ) {
        const id = node[this.conf.NODE__ID] ?? null;
        const holderId = node[this.conf.NODE__HOLDER_ID] ?? null;
        const flatCloneHolderId = flatNodeHolderClone._flatClone ? flatNodeHolderClone._flatClone[this.conf.NODE__ID] : null;
        const pathInJsonOfNodeHolder = flatNodeHolderClone._pathArray ?? ["ROOT-unhandled"];


        // let pathKeyInNodeHolder = JSON.stringify(nodeKey);
        let pathInJsonArray = [
            ...pathInJsonOfNodeHolder
        ];

        if ((pathInJsonOfNodeHolder.length > 1) && this.renderingMode === TreeConstants.RenderingMode.Conf) {

            // const subtreePropName: any = JSON.stringify(this.conf.SUBTREE);
            pathInJsonArray.push(this.conf.SUBTREE);
            pathInJsonArray.push(nodeKey);


            //pathKeyInNodeHolder = `[${subtreePropName}][${pathKeyInNodeHolder}]`;
        }
        else if (this.renderingMode === TreeConstants.RenderingMode.Ease) {

            //pathKeyInNodeHolder = `[${pathKeyInNodeHolder}]`;
            pathInJsonArray.push(nodeKey);
        }
        else {

            //pathKeyInNodeHolder = `[${pathKeyInNodeHolder}]`;
            pathInJsonArray.push(nodeKey);
        }
        const pathInJsonString = pathInJsonArray
            .map((jPathIndex, index) => {
                const jPathIndexText = JSON.stringify(jPathIndex);


                return (index === 0) ? jPathIndex : `[${jPathIndexText}]`;
            })
            .join("");
        const flatNodeClone = {};

        for (const propName in node) {
            const propValue = node[propName];
            const dataType = (typeof propValue);

            if (dataType === "object") {
                continue;
            }
            flatNodeClone[propName] = propValue;
        }
        const nodeClone = {
            [this.conf.NODE__ID]: id,
            [this.conf.NODE__HOLDER_ID]: holderId,
            _flatCloneHolderId: flatCloneHolderId,
            _id: nodePosition,
            _key: nodeKey,
            _flatClone: flatNodeClone,
            _pathArray: pathInJsonArray,
            _path: pathInJsonString
        };


        return nodeClone;
    }



    getTreeDataByJPath(jPathArray) {

        // since complexity of building jPath array in modeEase and modeConf, the JPathArray is not the same,
        // and modeEase was built from item at index 2, since it has array item at index 1 "Top": this.data["Top"], and modeConf does not have this array item.
        // modeConf was built recursively already from item at index 1.
        const startingIndexValidJPath = (this.renderingMode === TreeConstants.RenderingMode.Conf) ? 1 : 2;
        let retVal = new Object();
        retVal = JPath.getByJPath(
            jPathArray.slice(startingIndexValidJPath),
            this.data
        );


        return retVal;
    }


    // ADAPTIVE PLACEHOLDERS
    getSubtreeNodeToRender(
        _loopPropertyValue,
        _loopPropertyKey
    ) {
        return null;
    }



    getDataForRendering(
        _node,
        _flatNodeClone,
        _dataTypeString,
        _hasSubtree
    ) {
        return {
            iconSrc: "",
            iconShowClassName: "",
            labelText: "",
            hyperlink: "",
            cssClasses: "",
            dataId: "",
            dataHolderId: "",
            dataOrder: "",
            dataJson: "",
            openButtonStateClassName: "",
            hasSubtree: true
        };
    }



    getTreeNodeCssClasses(_dataType, _node) {
        return "";
    }


    // FINISH BLOCK ADAPTIVE PLACEHOLDERS
    // EVENTS BLOCK
    addJSTreeEventListener(eventName, eventHandler) {

        // the holder class LargeDomEventListenersOverheadOptimizer method call
        this.addThisClassEventListener(eventName, eventHandler);


        return this;
    }


    // the predefined events handlers
    addJSTreeEventListeners() {

        // the holder class LargeDomEventListenersOverheadOptimizer method call
        // Here is the predefined open button handler,
        // In Your custom code, this way You can define event handlers for heavy tree json data,
        // and the tree will not be overloaded of large number of events listeners on many html nodes.
        this.addDomEventListener(
            "click",
            ".open-button",
            this.initializeCustomJsTreeImprovedEventHandler(
                TreeConstants.TreeEventsNames.EVENT_NAME__TREE_NODE_EXPAND_BUTTON__CLICK,
                this.openButtonClickHandler.bind(this)
            )
        );
        this.addDomEventListener(
            "click",
            ".jstree-html-node-label",
            this.initializeCustomJsTreeImprovedEventHandler(
                TreeConstants.TreeEventsNames.EVENT_NAME__TREE_NODE_LABEL__CLICK,
                this.treeNodeLableClickHandler.bind(this)
            )
        );


        /* if (this.isModifiable) {
          this.addDomEventListener(
            "dblclick",
            ".jstree-html-node-holder-icon",
            this.contextMenuRender
          );
        } */


        // the holder class LargeDomEventListenersOverheadOptimizer method call
        this.addDomEventListeners();


        return this;
    }


    // here are set the JsTree event handlers actions, always needed, to reuse always in every JsTreeDomEventHndler.
    initializeCustomJsTreeImprovedEventHandler(
        jsTreeEventName,
        customEventHandler
    ) {
        return (eventPayload) => {
            const treeHtmlNode = eventPayload.eventTarget.closest(".jstree-html-node");
            const jsonNode = JSON.parse(this.unescapeHTMLFromAttribute(treeHtmlNode.dataset.json));

            if (this.debug === true) {
                console.log(
                    eventPayload.event.type,
                    treeHtmlNode,
                    jsonNode
                );
            }
            eventPayload = {
                ...eventPayload,
                jsonNode,
                treeHtmlNode,
                treeHtmlNodeHolder: treeHtmlNode.closest("li")
            };
            customEventHandler.call(this, eventPayload);
            this.emitEvent(jsTreeEventName, eventPayload);
        };
    }


    // the predefined events handlers
    openButtonClickHandler(eventPayload) {
        const toggleButton = eventPayload.eventTarget;

        if (toggleButton.classList.contains(TreeConstants.TreeCssClassNames.CLASS_WITHOUT_SUBTREE)) {
            return;
        }
        const subtreeContainer = toggleButton.closest("li").getElementsByTagName("ul")[0];
        const isOpened = toggleButton.classList.contains(TreeConstants.TreeCssClassNames.CLASS_OPENED);

        if (isOpened) {
            toggleButton.classList.remove(TreeConstants.TreeCssClassNames.CLASS_OPENED);
            subtreeContainer.style.display = "none";
        }
        else {
            toggleButton.classList.add(TreeConstants.TreeCssClassNames.CLASS_OPENED);
            subtreeContainer.style.display = "block";
        }
    }


    // the predefined events handlers
    treeNodeLableClickHandler(_eventPayload) {

        // example for custom event handler, the placeholder
    }


    // END EVENTS BLOCK
    getInModeConfDataNodeIsTreeItem(node) {

        // @ts-ignore
        const nodeLabelTextPropertyValue = node[this.conf.NODE_LABEL__TEXT];


        // the main conf required dsts json field is label text. and it cannot be an object, but a string or number.
        const isTreeItem = (nodeLabelTextPropertyValue && ((nodeLabelTextPropertyValue) !== "object"));


        return isTreeItem;
    }



    escapeHTMLForAttribute(str) {
        return str
            .replace(/"/g, "&quot;")


            // Replace double quotes
            .replace(/'/g, "&#39;")


            // Replace single quotes
            .replace(/</g, "&lt;")


            // Replace <
            .replace(/>/g, "&gt;");


        // Replace >
    }



    unescapeHTMLFromAttribute(str) {
        if (!str) {
            return "";
        }


        return str
            .replace(/&quot;/g, "\"")


            // Replace double quotes
            .replace(/&#39;/g, "'")


            // Replace single quotes
            .replace(/&lt;/g, "<")


            // Replace <
            .replace(/&gt;/g, ">");


        // Replace >
    }



    getTreeHtmlNodeDatasetJson(htmlNode) {
        if (htmlNode === null) {
            return "";
        }


        return JSON.parse(this.unescapeHTMLFromAttribute(htmlNode.dataset.json));
    }
}


