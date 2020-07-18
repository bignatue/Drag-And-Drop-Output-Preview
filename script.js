document.querySelectorAll(".drop-zone__input").forEach((inputElement) =>
{
  const dropZoneElement = inputElement.closest(".drop-zone");

  dropZoneElement.addEventListener("click", (e) =>
  {
    inputElement.click();
  });

  inputElement.addEventListener("change", (e) =>
  {
    if (inputElement.files.length)
    {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("dragover", (e) =>
  {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });

  ["dragleave", "dragend"].forEach((type) =>
  {
    dropZoneElement.addEventListener(type, (e) =>
    {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  dropZoneElement.addEventListener("drop", (e) =>
  {
    e.preventDefault();

    if (e.dataTransfer.files.length)
    {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("drop-zone--over");
  });
});


var outPut = document.getElementById('result');

/**
 * Updates the thumbnail on a drop zone element.
 *
 * @param {HTMLElement} dropZoneElement
 * @param {File} file
 */
function updateThumbnail(dropZoneElement, file)
{
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");


  console.log(file);
  
  // First time - remove the prompt
  if (dropZoneElement.querySelector(".drop-zone__prompt"))
  {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }

  // First time - there is no thumbnail element, so lets create it
  if (!thumbnailElement)
  {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  // show image
  if (file.type.startsWith("image/"))
  {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
    {
      outPut.innerHTML = "";
      outPut.style.backgroundImage = "";
      outPut.style.backgroundImage = `url('${reader.result}')`;
    };
  } else
  // text content
  if (file.type.startsWith("text/"))
  {
    outPut.innerHTML = "";
    outPut.style.backgroundImage = "";
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () =>
    {
      outPut.innerHTML = "";
      outPut.style.backgroundImage = "";
      outPut.innerHTML  = reader.result;
      console.log(reader.result);
    };
  } else
  // video content
  if (file.type.startsWith("video/"))
  {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
    {
      outPut.innerHTML = "";
      outPut.style.backgroundImage = "";
      url = reader.result;
      var video = document.createElement("video");
      var link = document.createElement("source");
      video.id = "video-player";
      video.controls = "controls";
      link.src = url;
      video.type = "video/mp4";
      video.style.height = `100%`;
      video.appendChild(link);
      outPut.appendChild(video);
      console.log(reader.result);
    };
  } else
  // audio content
    if (file.type.startsWith("audio/"))
  {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
    {
      outPut.innerHTML = "";
      outPut.style.backgroundImage = "";
      url = reader.result; 
      var sound = document.createElement("audio");
      var link = document.createElement("source");
      sound.id = "audio-player";
      sound.controls = "controls";
      link.src = url;
      sound.type = "audio/mpeg";
      sound.appendChild(link);
      outPut.appendChild(sound);
      console.log(reader.result);
    };
  }
  {
    thumbnailElement.style.backgroundImage = null;
  }
}
