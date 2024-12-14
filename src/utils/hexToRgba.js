const hexToRgba = (hex, opacity) => {
    // Remove the leading "#" if present
    hex = hex.replace("#", "");
  
    // Parse shorthand HEX (e.g., #03F to #0033FF)
    if (hex.length === 3) {
      hex = hex.split("").map((char) => char + char).join("");
    }
  
    // Extract the RGB values
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
  
    return `rgb(${r}, ${g}, ${b}, ${opacity})`;
  };
  
  export default hexToRgba;