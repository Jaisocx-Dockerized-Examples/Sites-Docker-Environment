
![../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg](../../../cdn/software_labels/Jaisocx/softlabel_jaisocx.svg)

# Computer calculations and data types

  [README.md HOME](./README.md)

## 1. Scientists idea to store Data in Computer


### 1.1 Electricity Scientists knew 2 types in AC/DC

There is voltage or no. 

Then we can imagine like we can store 2 values in one electric data cell, 
`one` if with electricity or `zero` if no electricity. 

And this datacell, with place for one binary value ( zero or one ), has name **BIT**.



### 1.2 Theoretique Scientists' agreement, a bit with voltage ( one ) on other position means other number value.

The programmers and maths scientists engineered idea and then agreed to think, 
that a number can be stored in the set of bit values,
and then in this bits set,
every next bit with value One ( 1 ) will mean the number, twice larger,
than the number on the position before.

For example, since always on the first position the One means One,
then on the second position, if bit set positive, then twice larger than one, means two,
and on the next, third position, twice larger than two on the second position, means twice 2, equals four,
then the next means twice four equals eight.

like this: 1, 2, 4, 8, 16, 64, 128, 256, 512, 1_024, 2_048, 4_096, ...

where:
```
( `bit_0`: 1 ), 
( `bit_1`: twice the previous bit_0 value 1 = 2 ), 
( `bit_2`: twice the previous bit_1 value 2 = 4 ), 
( `bit_3`: twice the previous bit_2 value 4 = 8 ), 
( `bit_4`: twice the previous bit_3 value 8 = 16 ), 
( `bit_5`: twice the previous bit_4 value 16 = 32 ), 
( `bit_6`: twice the previous bit_5 value 32 = 64 ), 
( `bit_7`: twice the previous bit_6 value 64 = 128 ), 
( `bit_8`: twice the previous bit_7 value 128 = 256 ), 
( `bit_9`: ...
```



And the interesting empirique knowledge then was, that when noting with raising powers of numbers,
then every bit on the postion in bits datacell,
equals two ( 2 ) raised with power of number, where this powering number equals the bit's position's number.

like the 4th bit, has position's number 3, and means 2 ^ 3 = 8, or ( 2 * 2 * 2 = 8 ). 2 multiplied by 2, 3 times. 

The logique, where the first position number is zero, has name `Base Zero`, and used for calculations in most programming languages.

The last position number always equals to the amount of elements in the dataset, minus one: ( 4 - 1 = 3 ).

A bit with zero value on any position means always zero, when summarizing the datacell value.




#### Example: 4 bits long number

**Numbers of 4 bits' postions, 0 til 3**:
```
0123
```

**Number value 4 bits long all Ones**
```
1111
```


**Theoretique, like in programming, these above values of every bit on next position, however a bit can have just 2 values, zero or one, without electricity or has electricity**
```
1248
```



#### Bits Values Explained:

**Next bit twice larger number than of the bit on the previeus position**

On the first position One, and a bit on the every next position means the number twice larger, than the bit value on the previeous position.

**Next Twice notation**

```
1: 1
2: 1*2 = 2
3: 2*2 = 4
4: 4*2 = 8
```



**Two Power of Notation**

```
1: 2^0 = 1
2: 2^1 = 2
3: 2^2 = 4
4: 2^3 = 8
```






### 1.3 Theoretique Scientists' agreement, a data packet of several bits together means the number of summarized every bit value in this data packet.

The sum of meant bit values then in theory meant the large number. in this sample: ( 1 + 2 + 4 + 8 = 15 ).

This way, the Integer values of 32 bits long ( 4 bytes each 8 bits ), can store numbers up to 4 millions.

And the modern 64 bits Long Integer values normally any large number used in life.



**DataPacket of 4 bits means SUM of all bit values on every position**

```
1 + 2 + 4 + 8 = 15 ( 4 bits maximal value 15, if on every position every bit has value One )
```

**DataPacket of 8 bits ( byte ) means SUM of all bit values on every position**

```
1 + 2 + 4 + 8 + 16 + 32 + 64 + 128 = 255 ( 8 bits maximal value 255, if on every position every bit has value One )
```



**DataPacket SIGNED byte ( Maximal value twice less ) means SUM of 7 bit values on every position, and the sign is the last bit flag, means a number less than zero or higher than zero**

```
1111111(1)

1 + 2 + 4 + 8 + 16 + 32 + 64 = -127 ( signed 8 bits minimal value -127, if on every position every bit has value One, with Sign bit flag meant this is a negative number )
```



```
1111111(0)

1 + 2 + 4 + 8 + 16 + 32 + 64 = 127 ( signed 8 bits maximal value 127, if on every position every bit has value One, with Sign bit flag meant this is s positive number )
```





### 1.4 Empirique obtained knowledge

The interesting thing then got known, 
that combinated with `zero` or `one` bit values on these 4 positions,
the number 15 and every lower number til zero, and zero,
may be stored in this 4 bits long datacell.



```
0000 = 0+0+0+0 = 0
1000 = 1+0+0+0 = 1
0100 = 0+2+0+0 = 2
1100 = 1+2+0+0 = 3
0010 = 0+0+4+0 = 4
1010 = 1+0+4+0 = 5
0110 = 0+2+4+0 = 6
1110 = 1+2+4+0 = 7
0001 = 0+0+0+8 = 8
1001 = 1+0+0+8 = 9
0101 = 0+2+0+8 = 10
1101 = 1+2+0+8 = 11
0011 = 0+0+4+8 = 12
1011 = 1+0+4+8 = 13
0111 = 0+2+4+8 = 14
1111 = 1+2+4+8 = 15
```




### 1.5 Theoretique Programmers' agreement, any 8 bits value, or 1 byte ( zero til 255 ) can mean a letter of Roman Alphabeth

The other way to store data in computer was, that since we just can store numbers,
then for other data these numbers can mean something. 

Or, better told, data can be saved, 
and can mean then set of numbers or set of letters like saved text,
for same bits combinations in a bitsblock 
and saved on harddrive set of bitsblocks.

Then, with this idea, just the rendering on display texts and ebooks programs
have to display letters,
according to datatypes or file types and encoding chartables rules,
however on computer's hard drive or flash card the magnet and electricity is stored.

This was just theoretique agreement of scientists to understand each other,
save and transer data in computers and over network.

This way, the byte number value 8 bits long can store one number, from zero til 255 ( two hundred fifty five ),
and this data type was chosen with Scientists
to mean and to store Roman Alphabet symbols in books, typed by keyboard and type machine.



**Why for letters chosen 8 bit numbers, or 1 byte numbers**

For Numbers, Capital Letters and Lower Letters,
since for numbers 0 til 9 ( `num`: 10 symbols ) and A til Z ( `UC`: 27 symbols ) and a til z ( `lc`: 27 symbols )
need space for number codes of ( 10 + 27 + 27 = 64 ) sixty four symbols,
and the 8 bit values ( zero til 255 ), have yet free places for 191 other symbols,
as `dot`, `dash`, `underscore`, other written and typed symbols.



**number 99 stored in 8 bit long datacell, or 1 byte, means letter c according to US_ASCII characters table**

For example, for the Alphabet, starting at number **97** meant letter **a**,
then number **98** will mean letter **b**, and **99** means **c**.

And otherwise, letter **c** will be always saved to computer as number **99** ( 1100 0110 ).

```
Letter c in US_ASCII noted bitwise:   1100 0110

bit magnecie set on position:   0  1  2  3    4  5  6  7
                                ^  ^  ^  ^    ^  ^  ^  ^
bit magnecie available:         1  1  0  0    0  1  1  0
bit theoretique value:          1  2  0  0    0 32 64  0

Two raised by power of:
1: bit_0:   2 ^ 0 = 1
2: bit_1:   2 ^ 1 = 2
3: bit_2:   0
4: bit_3:   0
5: bit_4:   0
6: bit_5:   2 ^ 5 = 32
7: bit_6:   2 ^ 6 = 64
8: bit_7:   0

SUM: 1 + 2 + 32 + 64 = 99 
```





