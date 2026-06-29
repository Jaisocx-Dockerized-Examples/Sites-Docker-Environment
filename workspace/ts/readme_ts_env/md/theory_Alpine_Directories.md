
![../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg](../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg)

# Alpine Linux Directories, relevant to software installs.

  [README.md HOME](./README.md)



## /etc = Conf

```fs;
/etc;
```
Configuration files.
If you install software via `apk`,
its configs usually land here.



## /opt = 3rd partie's software

```fs;
/opt;

/opt/myapp/bin;
/opt/myapp/lib;
/opt/myapp/conf;
```
Not heavily used by Alpine itself.
It’s available for you to install third‑party
or self‑contained software packages.
Many admins (like you!) prefer
`/opt` for unpacking tarballs
or vendor‑supplied binaries.





## /usr/local = Custom software
```fs;
/usr/local;
```
Traditional place for locally compiled
or manually installed software.
If you build from source, this is the “safe” namespace
that won’t clash with Alpine’s package manager (apk).





## /usr/lib = Shared libraries
```fs;
/usr/lib;
```
Shared libraries for system and user programs.





## /bin = core
```fs;
/bin;
/sbin;
/usr/bin;
/usr/sbin;
```
The core system binaries and utilities. 



## /var/cache/apk 

```fs;
/var/cache/apk;
```

Where Alpine’s package manager `Apk`
stores downloaded `.apk` archives before installation. 
You can clear this to save space.


