// Don't copy canvas image back into RAM in SDL_LockSurface()
Module['screenIsReadOnly'] = true;
// set nearest neighbor scaling, for sharply upscaled pixels
var canvasStyle = Module['canvas'].style;
canvasStyle.imageRendering = "optimizeSpeed";
canvasStyle.imageRendering = "-moz-crisp-edges";
canvasStyle.imageRendering = "-o-crisp-edges";
canvasStyle.imageRendering = "-webkit-optimize-contrast";
canvasStyle.imageRendering = "optimize-contrast";
canvasStyle.imageRendering = "crisp-edges";
canvasStyle.imageRendering = "pixelated";
