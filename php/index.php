<?php
    class View {
        function getIndex() {
            require __DIR__ . '/view/index.php';
        }
    }

    class API {
        function getAll() {
            require __DIR__ . '/api/restaurants/getAll.php';
        }
        function getOne($args) {
            require __DIR__ . '/api/restaurants/getOne.php';
        }
        function getNearby($args) {
            require __DIR__ . '/api/restaurants/getNearby.php';
        }
    }

    ini_set('display_startup_errors', 1);
    ini_set('display_errors', 1);
    error_reporting(-1);
    require 'include/vendor/autoload.php';

    $router = new AltoRouter();

    $router->setBasePath('/ERICA_restaurant/php');

    $router->map('GET', '/', 'View#getIndex');
    $router->map('GET', '/api/restaurants/', 'API#getAll');
    $router->map('GET', '/api/restaurants/[i:id]', 'API#getOne');
    $router->map('GET', '/api/restaurants/nearby', 'API#getNearby');

    // match current request url
    $match = $router->match();

    // call closure or throw 404 status
    if($match && is_callable(explode('#', $match['target']))) {
        list($controller, $action) = explode('#', $match['target']);
        $method = $_SERVER['REQUEST_METHOD'];
        call_user_func_array(array(new $controller(), $action), array($match['params']));
    } else {
        // no route was matched
        header( $_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
    }
?>
