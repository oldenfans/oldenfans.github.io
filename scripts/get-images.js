async function get_images() {
  const response = await fetch("https://images.search.yahoo.com/search/images;?p=shrek");
  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const images = doc.querySelectorAll("img");
  
  const chosen_images = [];
  for (let i = 0; i < 25; i++) {
    chosen_images.push(images[Math.floor(Math.random() * images.length)]);
  }
  
  chosen_images_src = [];
  chosen_images.forEach(function(img) {
    chosen_images_src.push(img.src);
  });

  return chosen_images_src;
}


async function display_images() {
  const images = await get_images();
  for (let i = 0; i < images.length; i++) {
    const img = document.createElement("img");
    img.src = images[i];
    img.width = 300;
    img.loading = "lazy";
  
    document.getElementById("picturesdiv").appendChild(img);
  }
}

display_images();

const load_on_scroll = true;
addEventListener("scroll", async (event) => {
  if (load_on_scroll) {
    await display_images();
    load_on_scroll = false;
  }
});

setInterval(() => {
  load_on_scroll = true;
}, 500);
