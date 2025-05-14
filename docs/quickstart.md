!!! warning "Platform"
    Triskel was only tested on Linux.
    If you are using other platforms, this might or might not work..

## Python

### Pip

Triskel is available as a pip package: [pytriskel](https://pypi.org/project/pytriskel/)

```
$ pip install pytriskel
```

### Compile a wheel

> Triskel uses [pybind11](https://github.com/pybind/pybind11) to generate its Python bindings.

From the `/bindings/python` directory run

```
$ pip wheel .
```

!!! info "Compiling a shared library"
    If you want to compile just the shared library, rather than build a python wheel, you need to [compile triskel](#c) with the cmake `BUILD_PYTHON_BINDINGS` flag set to `ON`.

## C++

Triskel can be built using `CMake`.

```
$ cmake -B build
$ cmake --build build
```

### Dependencies

Triskel with minimum options only depends on [libfmt](https://fmt.dev/11.1/).

To see a complete list of dependencies when all options are enabled, check out the [dependencies script](https://github.com/triskellib/triskel/blob/master/docker/fedora/dependencies.sh) used in the Fedora Docker image.

### Compilation options

#### Extensions

Triskel comes with a few extensions to facilitate integration with other tools.

##### `ENABLE_CAIRO`

This option adds a two renderers for exporting graphs to [PNGs]() and [SVGs]().

It requires [Cairo](https://www.cairographics.org/) as an additional dependency.

!!! info "Note"
    This option was enabled when building the Python and Java bindings.

##### `ENABLE_LLVM`

This option adds a [method]() to the API to convert [LLVM](https://llvm.org/) functions to triskel graphs.

It requires LLVM as an additional dependency.


##### `ENABLE_IMGUI`

This option adds a [renderer]() for displaying graphs in [ImGui](https://github.com/ocornut/imgui).

It requires ImGui as an additional dependency.

#### Example binaries

Triskel ships with a few example binaries

##### `BUILD_GUI`
Builds a simple graph explorer using ImGui.
This binary comes with a very rudimentary x86 disassembler for visualizing CFGs in binaries.
It is also able to display LLVM functions.

##### `BUILD_IMG`
Builds a simple binary that lays out the CFG of an LLVM Function and saves it to a PNG.

##### `BUILD_BENCH`

Builds the binary used for benchmarking, it lays out functions in LLVM `.ll` files without rendering them.
It can be optionally passed a function name to only lay out a single function.

!!! info "Note"
    This binary only provides debug and benchmarking info, it will not show you any graphs.

#### Bindings

These options are used for building bindings for other languages, refer to the section of the corresponding language to see how to build bindings for it.

- `BUILD_JAVA_BINDINGS`
- `BUILD_PYTHON_BINDINGS`
- `BUILD_WASM`

#### Development

Two options are available for dev builds, `ENABLE_LINTING` and `ENABLE_TESTING`.

## Javascript (WASM)

> Triskel uses [emscripten](https://emscripten.org/) to generate WASM.

To generate web assembly (WASM) from Triskel use `emcmake`.

```
emcmake cmake -B build -DCMAKE_TOOLCHAIN_FILE=$(WASM_TOOLCHAIN) -DBUILD_WASM=ON
cmake --build build
```

We used `emsdk` version `4.0.5`.


## Java

> Triskel uses [swig](https://www.swig.org/) to generate Java bindings.

Java binding only require to pass the appropriate CMake flag: `DBUILD_JAVA_BINDINGS`

```
cmake -B build -DBUILD_JAVA_BINDINGS=ON
cmake --build build
```

[:fontawesome-solid-arrow-right: API](api.md)