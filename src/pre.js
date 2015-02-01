// Don't copy canvas image back into RAM in SDL_LockSurface()
Module['screenIsReadOnly'] = true;
// set nearest neighbor scaling, for sharply upscaled pixels
var canavsStyle = Module['canvas'].style;
canavsStyle.msInterpolationMode = "nearest-neighbor";
canavsStyle.imageRendering = "optimizeSpeed";
canavsStyle.imageRendering = "-moz-crisp-edges";
canavsStyle.imageRendering = "-o-crisp-edges";
canavsStyle.imageRendering = "-webkit-optimize-contrast";
canavsStyle.imageRendering = "optimize-contrast";
canavsStyle.imageRendering = "crisp-edges";
canavsStyle.imageRendering = "pixelated";
