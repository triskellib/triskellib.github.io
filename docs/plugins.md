We integrated Triskel into binary analysis engines.

!!! warning "Limitation"
    The current plugin implementation do not perform any checks on the graph size which can lead to freezes / crashes.

!!! example "WIP"

    ## Binary Ninja

    ### Screenshots

    <div class="carousel">
    <div class="carousel-white"></div>
    <div class="carousel-images" id="carouselImages0">
        <div class="carousel-image">
            <img src="../assets/screenshots/binja1.png" alt="Binary Ninja screenshot">
        </div>
        <div class="carousel-image">
            <img src="../assets/screenshots/binja2.png" alt="Binary Ninja
        screenshot">
        </div>
        <div class="carousel-image">
            <img src="../assets/screenshots/binja3.png" alt="Binary Ninja screenshot">
        </div>
        <div class="carousel-image">
            <img src="../assets/screenshots/binja4.png" alt="Binary Ninja screenshot">
        </div>
        <div class="carousel-image">
            <img src="../assets/screenshots/binja5.png" alt="Binary Ninja screenshot">
        </div>
    </div>
    <div class="carousel-blue left">
        <button class="nav-button" onclick="prevSlide(0)">&#10094;</button>
    </div>
    <div class="carousel-blue right">
        <button class="nav-button" onclick="nextSlide(0)">&#10095;</button>
    </div>
    </div>

    ### Installation

    This plugin is currently unavailable to the public!

    ### Usage

    #### Changing the layout engine

    To pick the new layout engines provided by Triskel, go to
    `Edit > Settings > Rendering > graph > Default Graph Layout`, and switch the engine to Triskel.

    ![The option location in Binary Ninja](assets/plugins/binja/settings.png)

    #### Options

    Triskel's layout comes with different compactness options to suit your personal preference. These options only change spacing between blocks.

    ### Reporting a bug

    You can access Triskel's build information for reporting a bug by going to
    `Plugins > Triskel Version`.

    ![The version window in Binary Ninja](assets/plugins/binja/version.png)

    !!! tip "Shout out"
        Huge shout out to Binary Ninja for being very helpful!


## Ghidra

### Screenshots

<div class="carousel">
  <div class="carousel-white"></div>
  <div class="carousel-images" id="carouselImages1">
    <div class="carousel-image">
        <img src="../assets/screenshots/ghidra1.png" alt="Ghidra screenshot">
    </div>
    <div class="carousel-image">
        <img src="../assets/screenshots/ghidra2.png" alt="Ghidra
    screenshot">
    </div>
    <div class="carousel-image">
        <img src="../assets/screenshots/ghidra3.png" alt="Ghidra screenshot">
    </div>
    <div class="carousel-image">
        <img src="../assets/screenshots/ghidra4.png" alt="Ghidra screenshot">
    </div>
    <div class="carousel-image">
        <img src="../assets/screenshots/ghidra5.png" alt="Ghidra screenshot">
    </div>
  </div>
  <div class="carousel-blue left">
    <button class="nav-button" onclick="prevSlide(1)">&#10094;</button>
  </div>
  <div class="carousel-blue right">
    <button class="nav-button" onclick="nextSlide(1)">&#10095;</button>
  </div>
</div>

### Installation

Go to the [ghidra extension repo](https://github.com/triskellib/ghidra), and download the [latest release](https://github.com/triskellib/ghidra/releases/download/v0.3.1/ghidra_11.3.2_PUBLIC_20250512_Triskel.zip).

You can then install it like a regular Ghidra extension

??? info "Installing a Ghidra Extension"
    When starting Ghidra, Go to `File > Install Extension`.
    ![Ghidra launch screen](assets/plugins/ghidra/launch.png)

    Then click on the green plus at the top left and select the downloaded zip.
    ![Ghidra's button to add an extension](assets/plugins/ghidra/plus.png)

    Finally, restart Ghidra.

### Usage

Start by opening a function's graph view.

![Ghidra's button to open a function's graph view](assets/plugins/ghidra/graph_view.png)

#### Changing the layout engine

On the dropdown to select a layout engine, select Triskel.

![Ghidra's dropdown to select a layout engine](assets/plugins/ghidra/selection.png)


<script>
  const carousels = [document.getElementById('carouselImages0'), document.getElementById('carouselImages1')];
  let index = [0, 0];

  let delay = 3000;

  let timeoutIDs = [null, null];

  const updateCarousel = (idx) => {
    clearTimeout(timeoutIDs[idx]);
    carousels[idx].style.transform = `translateX(-${index[idx] * carousels[idx].clientWidth}px)`;
  }

  const nextSlide = (idx) => {
    const totalSlides = carousels[idx].children.length;
    index[idx] = (index[idx] + 1) % totalSlides;
    updateCarousel(idx);
    timeoutIDs[idx] = setTimeout(() => nextSlide(idx), delay);
  }

  const prevSlide = (idx) => {
    const totalSlides = carousels[idx].children.length;
    index[idx] = (index[idx] - 1 + totalSlides) % totalSlides;
    updateCarousel(idx);
    timeoutIDs[idx] = setTimeout(() => nextSlide(idx), delay);
  }

  timeoutIDs[0] = setTimeout(() => nextSlide(0), delay);
  timeoutIDs[1] = setTimeout(() => nextSlide(1), delay);
</script>