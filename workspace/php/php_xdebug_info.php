<?php

  $zend_extensions_true = true;
  $find_strict_true = true;

  $extensionsArray = get_loaded_extensions( $zend_extensions_true );
  // print_r( $extensionsArray );

  $xdebugOn = in_array( "Xdebug", $extensionsArray, $find_strict_true );

  if ( $xdebugOn == true ) {
    echo xdebug_info();
  } else {
    echo "No XDebug...";
  }

  exit(0);

?>


