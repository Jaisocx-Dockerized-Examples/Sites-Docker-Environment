


class CleanTreeCounter {
  versionExactReferenced = 0;
  versionsEncountered = ( new Object() );

  constructor() {
    this.versionExactReferenced = 0;
    this.versionsEncountered = ( new Object() );
  }
}



class CleanTreeRecord {
  packageName = "";
  packageVersion = "";
  counters = ( new Object() );

  constructor() {
    this.packageName = "";
    this.packageVersion = "";
    this.counters = ( new Object() ); // ( new CleanTreeCounter() );
  }
}



class JaisocxLockViewer extends Tree {

  #js_packages = ( new Object() );
  #counters = ( new Object() );

  KEYWORD_NODEMODULES = ( new Object() );
  NAMESPACE = ( new Object() );

  CHARCOUNT_KEYWORD_NODEMODULES = 1;
  CHARCOUNT_NAMESPACE = 1;


  constructor() {
    super();

    this.#js_packages = ( new Object() );
    this.#counters = ( new Object() );

    this.KEYWORD_NODEMODULES = "node_modules/";
    this.NAMESPACE = "@jaisocx/";

    this.CHARCOUNT_KEYWORD_NODEMODULES = this.KEYWORD_NODEMODULES.length;
    this.CHARCOUNT_NAMESPACE = this.NAMESPACE.length;
  }

  getJsPack() {
    let jspackages = this.#js_packages;

    return jspackages;
  }

  getCounters() {
    let c = this.#counters;

    return c;
  }



  beforeRenderOneNode ( eventName, eventPayload ) {

    let key = eventPayload.treeItemJson._key; // : "@jaisocx/event-emitter";

    if (
      ( Number.isInteger( key ) === true )
      || ( key.substring( 0, this.CHARCOUNT_NAMESPACE ) !== "@jaisocx/" )
    ) {
      return { "value": eventPayload };
    }


    if (
      ( this.#js_packages[ key ] === undefined )
      || ( this.#js_packages[ key ] === null )
    ) {
      this.#js_packages[ key ] = ( new Object() ); // ( new CleanTreeRecord() );
      this.#js_packages[ key ].counters = ( new Object() );
      this.#js_packages[ key ].counters.versionsEncountered = ( new Object() );
      this.#js_packages[ key ].packageName = key;

      let jPath = ( new JPath() );
      this.#js_packages[ key ].packageVersion = JPath.getByJPath (
        [
          "packages",
          [ this.KEYWORD_NODEMODULES, key ].join( "" ),
          "version"
        ],
        this.data
      );

      this.#counters[ key ] = ( new Array() );
    }

    let dependencyNum_AsIs = eventPayload.treeItemJson._flatClone[ key ]; // "^1.4.2"
    this.#counters[ key ].push( dependencyNum_AsIs );



    let pathArray = eventPayload.treeItemJson._pathArray;
     /* [
      "this.data",
      "Top",
      "packages",
      "node_modules/@jaisocx/tooltip",
      "optionalDependencies",
      "@jaisocx/event-emitter"
    ]; */

    let lastIx = ( pathArray.length - 1 );
    let currentIx = lastIx;
    let packIx = ( currentIx - 2 );
    let dependentKey = pathArray[ packIx ];
    let dependent = dependentKey.substring( this.CHARCOUNT_KEYWORD_NODEMODULES, dependentKey.length ); // "node_modules/@jaisocx/tooltip"
    if ( dependent.length === 0 ) {
      return { "value": eventPayload };
    }

    if (
      ( this.#js_packages[ dependent ] === undefined )
      || ( this.#js_packages[ dependent ] === null )
    ) {
      this.#js_packages[ dependent ] = ( new Object() ); //( new CleanTreeRecord() );
      this.#js_packages[ dependent ].counters = ( new Object() );
      this.#js_packages[ dependent ].counters.versionsEncountered = ( new Object() );
      this.#js_packages[ dependent ].packageName = dependent;

      this.#counters[ dependent ] = ( new Array() );
    }


    let dependencyNum_AsKey = dependencyNum_AsIs;
    if (
      ( dependencyNum_AsIs.charAt( 0 ) === "^" )
      || ( dependencyNum_AsIs.charAt( 0 ) === "~" )
    ) {
      dependencyNum_AsKey = dependencyNum_AsIs.substring( 1, dependencyNum_AsIs.length );
    }

    if (
      ( this.#js_packages[ key ].counters.versionsEncountered[ dependencyNum_AsKey ] === undefined )
      || ( this.#js_packages[ key ].counters.versionsEncountered[ dependencyNum_AsKey ] === null )
    ) {
      this.#js_packages[ key ].counters.versionsEncountered[ dependencyNum_AsKey ] = ( new Array() );
    }

    this.#js_packages[ key ].counters.versionsEncountered[ dependencyNum_AsKey ].push( dependent );

    return { "value": eventPayload };
  }
}


