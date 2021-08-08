

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var STOP_BOT = false
var COWIN_BOT_RUNNING = false
var COWIN_BOT_ITER = 0

var model = "eyJNTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExMUUxMUUxMUUxMUUxMUUxMUUxMUVpNTExRTExMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTExRTExRTExRTExRTExRTExMUUxMTFFMTFFaIjoiMiIsIk1MTFFMTFFMTFFMTFFMTExRTExRTExRTExRTExRTExRTExRTExMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUVpNTExRTExRTExRTExRTExRTExMTFFMTFFMTFFMTFFMTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExMTFFMTFFMTFFMTFFMTFFMTFFMTExMUUxMUUxMUUxMUUxMUUxMUUxMTExMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFaIjoiMyIsIk1MTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFaTUxMUUxMTFFMTFFMTFFMTFFMTFFMTFFMTExRTExMUUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTExRTExRTExRTExRWk1MTFFMTFFMTFFMTFFMTFFaIjoiNCIsIk1MTFFMTFFMTFFMTFFMTFFMTFFMTFFMTExMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMUUxMTExMUUxMTFFMTExRTExRTExRTExMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMTExRTExRTExRTExRTExRWiI6IjUiLCJNTExRTExRTExRTExRTExRTExRTExRTExRTExRWk1MTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMTExRTExRTExRTExMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUVpNTExRTExRTExRTExRTExRTExRTExRTExRWiI6IjYiLCJNTExRTExRTExMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTExRTExRTExRTExMUUxMUUxMUUxMUUxMUVpNTExMUUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTExMTFFMTFFMTFFMTFFMTFFMTExRTExMUUxMUUxMUUxMTFFaIjoiNyIsIk1MTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMUUxMUUxMUUxMUVpNTExMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUVpNTExMUUxMUUxMUUxMUUxMTExMUUxMUUxMUUxMUUxMTExRTExMUUxMUUxMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUVpNTExRTExMUUxMUUxMUUxMUUxMUUxMUVoiOiI4IiwiTUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFaTUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTExRTExRTExRTExRTExMUVpNTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRWiI6IjkiLCJNTExRTExRTExRTExRTExRTExRTExRTExRWk1MTFFMTExRTExRTExRTExRTExRTExRTExMUUxMUUxMUUxMUUxMTFFMTExRWiI6InYiLCJNTExRTExRTExRTExRTExRTExRTExRTExRTExMUUxMTFFMTFFMTFFMTExRTExRTExRTExRWk1MTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTExRWiI6IloiLCJNTExRTExRTExRTExRTExRTExRTExRTExRWk1MTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUVoiOiJkIiwiTUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTExRTExRTExRTExRTExRTExMUVoiOiJ4IiwiTUxMUUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFMTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExMUUxMUUxMUUxMUUxMUVoiOiJNIiwiTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUVpNTExRTExRTExRTExRTExRTExRTExRTExMUUxMUUxMUUxMTFFMTExRTExRTExRTExRTExRWk1MTFFMTFFMTFFMTFFMTExMTFFMTExRTExRTExMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFMWk1MTFFMTFFMTFFMTFFMTExRTExMUUxMTFFMTFFaIjoicCIsIk1MTFFMTExRTExRTExRTExMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMTFFMTFFaTUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFMTExRTExRTExMUUxMTExRTExRTExMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFaIjoiZiIsIk1MTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTExRTExRTExRTExRTExRTExMUUxMUUxMUUxMUVpNTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExMUUxMUUxMUUxMTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRWiI6IkUiLCJNTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRWk1MTFFMTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRWiI6Im4iLCJNTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRWk1MTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTFFaTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUVoiOiJxIiwiTUxMUUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTExRTExRTExRTExRTExRTExMUVpNTExRTExRTExRTExRTExRTExMUUxMUUxMUUxMUUxMTFFMTExRTExRTExRTExMUUxMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFoiOiJ3IiwiTUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTExRTExMUUxMUUxMUUxMUUxMUUxMUUxMTFFaTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMTFFMTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExMUUxMUUxMUUxMUUxMUUxMUUxMUVoiOiJXIiwiTUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFaTUxMTExMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUVoiOiJKIiwiTUxMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUVoiOiJUIiwiTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUVpNTExRTExRTExRTExRTExRTExRWk1MTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTExRTExRTExRWk1MTFFMTFFMTFFMTFFMTExRTExRTExRTExRWk1MTExRTExMTExRTExMUUxMUUxMUUxMUUxMUUxMUVoiOiJCIiwiTUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFaIjoiSCIsIk1MTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTExRTExRTExRTExRWk1MTFFMTFFMTFFMTFFMTFFMTFFMTExMUUxMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFpNTExMWiI6InIiLCJNTExRTExRTExRTExRTExRTExRTExRTExMUUxMUVpNTExRTExMUUxMUUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTExRTExRWiI6InkiLCJNTExRTExRTExRTExRTExRTExRTExRTExRTExMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTFFaTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTExMTFFMTFFMTExRTExRTExRTExRTExRTExRTExRTExRWiI6InUiLCJNTExRTExRTExRTExRTExRTExRTExRTExRTExMUUxMUUxMUUxMUUxMUUxMUVpNTExRTExRTExaTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTExRTExRTExRTExRTExRTExMUUxMTExRTExRWk1MTExRTExRTExRTExRTExRTExRTExRWiI6ImoiLCJNTExRTExRTExMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUVpNTExRTExRTExRTExRTExRTExRTExMUUxMTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExMTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRWiI6IlMiLCJNTExMUUxMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFMTExRTExRTExRTExRTExRTExRTExRTExRTExRWk1MTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTExMTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExMUUxMUUxMTExRTExRTExRTExMUUxMUVoiOiJzIiwiTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUVpNTExRTExRTExRTExMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUVoiOiJDIiwiTUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExMUUxMUUxMUVpNTExRTExRTExRTExRTExMUUxMUUxMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTExRTExRTExRTExRTExRTExRTExRTExMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMTFFMTFoiOiJHIiwiTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUVpNTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRWk1MTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTExRWk1MTFFMTFFMTFFMTFFMTFFMTFFMTFFMTExRWiI6ImIiLCJNTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRWk1MTFFMTFFMTFFMTFFMTFFMTFFMTFFMTExRTExRTExRTExRTExRTExRTExRTExRTExRTExMUUxMUUxMUUxMUUxMUUxMTFFMTFFaIjoiaCIsIk1MTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMWk1MTFFMTExRTExRTExRTExRTExRTExRTExRTExRTExMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUVoiOiJOIiwiTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMTFFMTExRTExRTExRTExRTExRTExRTExRTExRTExRWiI6InoiLCJNTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUVpNTExRTExRTExRTExRTExRTExRTExRTExMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFMTExRTExRTExMUUxMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTExRTExRWk1MTExaIjoibSIsIk1MTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMTExRTExRTExRTExRTExRTExRTExMUUxMUUxMUUxMUVoiOiJYIiwiTUxMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTExRTExRTExRTExRTExRWk1MTFFMTExRTExRTExRTExRTExRTExRTExRTExRTExRTExMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTExRTExMUUxMUUxMUVoiOiJ0IiwiTUxMUUxMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTExRTExMUUxMUUxMUUxMUUxMUVpNTExRTExMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUVpNTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExMTFFMTFFMTFFMTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTExMTFFMTFFMTFFaIjoiUSIsIk1MTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTExRTExRTExRTExRTExRTExRTExRTExRWk1MTFFMTFFMTFFMTFFMTFFMTExRTExMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTExMUUxMUUxMUUxMUUxMUUxMTFFMTExRTExRTExMUUxMTFFaTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUVoiOiJnIiwiTUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFaIjoiViIsIk1MTFFMTFFMTFFMTFFMTFFMTFFMTFFaTUxMUUxMTFFMTFFMTFFMTFFMTFFMTExRTExRTExRTExRTExRTExRTExRTExRWk1MTExRTExRTExRTExRTExRTExRTExMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFMTExRTExRWk1MTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFaIjoiYSIsIk1MTFFMTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFaTUxMTFFMTFFMTFFMTFFMTFFMTExRTExMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUVpNTExRTExMUVoiOiJBIiwiTUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTExRTExRTExRWk1MTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTExRTExRTExRTExRTExMUUxMUUxMUUxMUUxMUUxMUVoiOiJGIiwiTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUVoiOiJVIiwiTUxMUUxMUUxMUUxMUUxMUUxMUVpNTExRTExRTExRTExRTExRTExRTExRTExMUUxMUUxMTFFMTFFMTFFaTUxMTExRTExRTExRTExMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTFFaTUxMUUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFaIjoiUiIsIk1MTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUVpNTExRTExRTExRTExMUUxMUUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMUUxMUUxMUUxMUVoiOiJEIiwiTUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTExRTExRTExRTExRTExRTExRTExMUUxMUUxMUVpNTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExRTExMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMTExRTExRTExRWiI6ImMiLCJNTExRTExRTExRTExRTExRTExRTExRTExRTExRTExMUUxMUUxMUUxMUVpNTExRTExRTExRTExRTExMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUVoiOiJrIiwiTUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFMTFFMTExRTExRTExRTExMTExRWk1MTFFMTFFMTFFMTExRTExRTExMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFaIjoiSyIsIk1MTFFMTFFMTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFMTExRTExRTExRTExRTExRWk1MTFFMTFFMTFFMTFFMTFFMTFFMTFFMTExRTExRTExRTExRTExMUUxMUUxMUUxMUUxMUUxMUUxMTFFaTUxMUUxMUUxMUUxMUUxMUVpNTExRTExMTFFMTFFMTFFaIjoiZSIsIk1MTExRTExRTExRTExRTExRTExRTExRTExRTExRWk1MTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTExRTExRTExRTExRTExaIjoiWSIsIk1MTFFMTFFMTExRTExRTExRTExRWk1MTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMTFFMTFFMTFFMTFFMTFFaTUxMUUxMUUxMUUxMUUxMUUxMUUxMUUxMTFFaIjoiUCJ9"

var parsed_model = JSON.parse(atob(model))
var parser = new DOMParser();
async function go({state, age, vaccine, type, n, mode, searchIntervalInSeconds, appointmentSlot, searchType='districts', pincodes=[], districts=[], runs=1, skipDays=1, weeks=1}) {
    try {
        console.log({runs})
        var foundSlot = false
        for (var iter=0; iter < runs; iter++) {
            COWIN_BOT_ITER = iter
            console.log({STOP_BOT})
            if (STOP_BOT) {
              STOP_BOT = false
              COWIN_BOT_RUNNING = false
              break
            }
            chrome.runtime.sendMessage({iter});
            if (!state) return
            // var script = document.createElement('script');script.src = "https://code.jquery.com/jquery-3.4.1.min.js";document.getElementsByTagName('head')[0].appendChild(script);
            await sleep(300)
            if (searchType === "districts") {
                if ($("mat-label:contains('Select State')").length === 0) {
                    $(".status-switch")[0].click()    
                }
                if (iter === 0) {
                    console.log("Selecting State", state)
                    await sleep(500)
                    $("mat-select")[0].click()
                    await sleep(1000)
                    $(".mat-option-text").each( (i, e) => { if ($(e).text().trim() === state) $(e).click() })
                    await sleep(500)
                    console.log("Waiting for districts to load")

                    do {
                        $("mat-select")[1].click()
                        await sleep(100)
                        district_options = $(".mat-option-text")
                        if (districts.length == 0) {
                            districts = $(".mat-option-text").map((x, e) => $(e).text())
                        }
                    } while (district_options.length === 0)
                }
                console.log(district_options.length, " Districts loaded")
                console.log("Search across districts: ", districts)
            } else {
                if ($("mat-label:contains('Enter your PIN')").length === 0) {
                    $(".status-switch")[0].click()    
                }
            }
            
            const search_queries = searchType === "districts" ? districts : pincodes;
            for (i = 0; i < search_queries.length; i++) {
                if (STOP_BOT) {
                  STOP_BOT = false
                  COWIN_BOT_RUNNING = false
                  return
                }
                if (searchType === "districts") {
                    if (iter === 0 || search_queries.length > 1) {
                        $("mat-select")[1].click()
                        await sleep(100)
                        $(".mat-option-text").each( (_, dEle) => { 
                            if ($(dEle).text().trim().toLowerCase() === districts[i].trim().toLowerCase()) {
                                $(dEle).click() 
                            }
                        })
                    }
                    $(".district-search")[0].click()
                } else {
                    $($("input[formcontrolname='pincode']")[0]).val(pincodes[i])
                    $("input[formcontrolname='pincode']")[0].dispatchEvent(new Event("input", { bubbles: true }));
                    await sleep(100)
                    $(".pin-search-btn")[0].click()
                }
                var week = 0
                do {
                    if (week > 0) {
                        console.log("NEXT WEEK")
                        $(".carousel-control-next-icon")[0].click()
                    }
                    await sleep(100)
                    var j = 0
                    while (true) {
                        list = $("mat-selection-list mat-list-option")
                        not_available = $(".available-para")
                        if (list.length > 0 || not_available.length > 0) {
                            console.log("Response received")
                            break
                        }
                        j += 1
                        if (j >= 10) {
                            break
                        }
                        await sleep(500)
                    }
                    console.log({list, not_available})
                    if ((age || vaccine || type) && (week == 0)) {
                        console.log("Setting filters", {week})
                        $("div.agefilterblock label").each( (i, e) => { if ([age, vaccine, type].indexOf($(e).text().trim()) >= 0) $(e).click() })
                        await sleep(100);
                    }
                    foundSlot = false
                    var slotRows = $("ul.slot-available-wrap") || []
                    for (var ii = 0; ii < slotRows.length; ii++) {
                        var e = $(slotRows[ii]);
                        var isSlotBooked = true
                        var slots = $(e).find("li a")
                        for (var g = 0; g < slots.length; g++) {
                            if (week == 0 && g < skipDays) {
                                continue
                            }
                            var slot = $(slots[g])
                            if ((parseInt($(slot).text().trim()) || 0) >= n) {
                                isSlotBooked = false
                                if (mode === 1) {
                                    $(slot).parents('.slots-box')[0].click()
                                    k = 0;
                                    while (k<=5) {
                                        if ($("ion-button.time-slot").length > 0) {
                                            break
                                        }
                                        k++;
                                        await sleep(300)
                                    }
                                    if ($("ion-button.time-slot").length > 0) {
                                        foundSlot = true
                                        chrome.runtime.sendMessage({"status": "slot_found"})
                                        console.log("HERE")
                                        break
                                    }
                                    
                                }
                            }
                        }
                        if (isSlotBooked) {
                            // $(e).parents('.mat-list-text')[0].remove()
                        }
                        if (foundSlot) {
                            break
                        }
                    }
                    if (foundSlot) {
                        break
                    } else {
                        // console.log("Waiting to go to next week")
                        week++
                    }
                } while (week <= weeks)
                if (!foundSlot) {
                    // go back X weeks
                    for (var w = 0; w < weeks; w++) {
                        console.log("Going back 1 week")
                        $(".carousel-control-prev-icon")[0].click()
                        j = 0
                        while (true) {
                            list = $("mat-selection-list mat-list-option")
                            not_available = $(".available-para")
                            if (list.length > 0 || not_available.length > 0) {
                                console.log("Response received")
                                break
                            }
                            j += 1
                            if (j >= 15) {
                                break
                            }
                            await sleep(500)
                        }
                    }
                }
                if (foundSlot) {
                    try {
                        $("ion-button.time-slot")[appointmentSlot-1].click()
                    } catch (e) {
                        $("ion-button.time-slot")[0].click()
                    }
                    
                    var svg;
                    j = 0
                    while (j <= 15) {
                        try {
                            await sleep(350)
                            svg = parser.parseFromString(atob($("img#captchaImage").attr("src").split("base64,")[1]), "image/svg+xml");
                            break;
                        } catch (e) {
                            console.log(e)
                        }
                        j += 1;
                    }
                    
                    $(svg).find('path').each((_, p) => { if($(p).attr('stroke') != undefined) $(p).remove()})
                    vals = []
                    $(svg).find('path').each(
                        (_, p) => { 
                            idx = parseInt($(p).attr("d").split(".")[0].replace("M", ""))
                            vals.push(idx)
                        }
                    )
                    var sorted = [...vals].sort(function(a,b) { return a - b; })
                    var solution = ['', '', '', '', '']

                    $(svg).find('path').each(
                        (idx, p) => { 
                            var pattern = $(p).attr('d').replace(/[\d\.\s]/g, "")

                            solution[sorted.indexOf(vals[idx])] = parsed_model[pattern]
                        })
                    await sleep(100)
                    $($(".captcha-style input")[0]).focus();
                    chrome.runtime.sendMessage({"status": "entering_captcha"});
                    for (var ii=0; ii<5; ii++) {
                        $($(".captcha-style input")[0]).val(solution.join("").substr(0, ii+1));
                        await sleep(100)
                        $(".captcha-style input")[0].dispatchEvent(new Event("keyup", { bubbles: true }));
                        await sleep(100)
                    }
                    await sleep(500)
                    $("ion-button.confirm-btn")[0].click()
                    chrome.runtime.sendMessage({"status": "loading"});
                    while(1) {
                        if (document.getElementsByClassName("thank-you-header").length > 0) {
                            chrome.runtime.sendMessage({"status": "appointment_successful"});
                            break
                        }
                        await sleep(500)
                    }
                }

                if (mode === 1 && foundSlot)
                    break
                console.log("Waiting", searchIntervalInSeconds*1000)
                await sleep(searchIntervalInSeconds*1000)
          }
          if (foundSlot && mode === 1) {
              break
          } 
        }
    } catch (e) {
        console.error(e)
    }
    COWIN_BOT_RUNNING = false
    chrome.runtime.sendMessage({"status": "complete"});
}