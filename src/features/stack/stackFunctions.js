export function valueReturn(value) {
  if (Number(value) < 0) {
    console.log("Negative value!", value);
    return value;
  } else if ((Number(value) === Infinity) | (Number(value) === -Infinity)) {
    console.log("Infinite value!", Math.abs(value));
    return 0;
  }
  return value;
}

export function validate(e) {
  // TODO validation
  // Total thickness > ccc thickness
  // e.target.classList.toggle("invalid");
  // if( TotalCathodeThickness-CCCThickness<0){
  //     e.target.classList.add("invalid");
  // }
  // else if( TotalCathodeMass-CCCMass<0){
  //     e.target.classList.add("invalid");
  // }
  // else{
  //     e.target.classList.remove("invalid");
  // }
  console.log(e);
}

export function capitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
