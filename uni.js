(
  function () {
  var a = b = 3;
  }
)   ();

console.log("a defined? " + (typeof a !== "undefined"));
console.log("b defined? " + (typeof b !== "undefined"));

AGE5 = IF(
  OR(
    AND(
      prevSignal=0, signal<>0
      ),
    AND(prevSignal=-1, signal= 1),
    AND(prevSignal = 1, signal = -1),
    AND(prevAGE = holding limit, signal = 1),1,
    IF(
      OR( AND(signal=0, prevPOS=0),
      SCAP = 1,LCAP = 1,prevAGE = holding limit)
      ,0,age+1)

=IF(OR(
      AND(AE71=0,AE72<>0),
      AND(AE71=-1,AE72=1),
      AND(AE71=1,AE72 =-1),
      AND(AH71=B5,AE72=1)),1,
      IF(OR(
            AND(AE72=0,AJ71=0),
            AG72=1,AF72=1,AH71=B5)
            ,0,AH71+1))
=IF(OR(
              AND(AE71=0,AE72<>0),
              AND(AE71=-1,AE72=1),
              AND(AE71=1,AE72 =-1),
              AND(AH71=$B$5,AJ<>0)),1,
              IF(OR(
                    AND(AE72=0,AJ71=0),
                    AG72=1,AF72=1,AH71=$B$5),0,AH71+1))

= IF(AND(signal=0,LCAP=0,SCAP=0,AGE=0),prevPOS,signal)
=IF(prevAGE=B5,1,0)


new signal
OR(AND(AE71=1,AE72=-1),AE71=-1>AE72=1,AE71=0>AE72=1,AE71=0>AE72=-1)

AND(AE71=1,AE72=-1)

AND(AH71=$B$5,AE72<>0) 

AND(AJ71=0,AE72<>0)
------------------------------------

AC9*X10=-1
AJ71*AE72=-1

AND(AJ71=0,AE72<>0)


Signal-AE72 - X
Lcap - AF72
Scap - AG72
Age - AH72   -AA
Aged - AI
pos - AJ    -AC

= IF(OR(
  AND(AJ71=0,AE72<>0),
  AJ71*AE72=-1,
  AND(AH71=$B$5,AE72<>0)),1,
  IF(OR(
        AND(AE72=0,AJ71=0),
        AG72=1,AF72=1,AH71=B5),0,AH71+1))


