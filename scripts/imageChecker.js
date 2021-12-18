function checkIfImageExists(url) {
    const img = new Image();
    img.src = url;
    
    if (img.complete) {
      return true;
    } else {
      img.onload = () => {
        return true;
      };
      
      img.onerror = () => {
        alert("La imagen insertada no existe")
        return false
      };
    }
  }
  