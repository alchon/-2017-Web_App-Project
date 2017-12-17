<?php
    class View {
        function getIndex() {
            require __DIR__ . '/view/index.php';
        }
    }

    class Restaurants {
        function getAll() {
            require __DIR__ . '/api/restaruants/getAll.php';
        }
        function getOne($args) {
            require __DIR__ . '/api/restaruants/getMenu.php';
        }
        function getNearby($args) {
            require __DIR__ . '/api/restaruants/getNearby.php';
        }
        function search($args) {
            require __DIR__ . '/api/restaruants/search.php';
        }
        function getIds($args) {
            require __DIR__ . '/api/restaruants/getIds.php';
        }
    }

    class Replys {
        function getAll($args) {
            require __DIR__ . '/api/replys/getAll.php';
        }
        function getOne($args) {
            require __DIR__ . '/api/replys/getOne.php';
        }
        function create($args) {
            require __DIR__ . '/api/replys/createReply.php';
        }
        function update($args) {
            require __DIR__ . '/api/replys/editReply.php';
        }
        function remove($args) {
            require __DIR__ . '/api/replys/deleteReply.php';
        }
        
    }

    ini_set('display_startup_errors', 1);
    ini_set('display_errors', 1);
    error_reporting(-1);
    require 'include/vendor/autoload.php';

    $router = new AltoRouter();

    $router->setBasePath('/api');

    $router->map('GET', '/', 'View#getIndex');
    $router->map('GET', '/restaruants/', 'Restaurants#getAll');
    $router->map('GET', '/restaruants/[i:id]', 'Restaurants#getOne');
    $router->map('GET', '/restaruants/[i:id]/menu', 'Restaurants#getMenu');
    $router->map('GET', '/restaruants/nearby', 'Restaurants#getNearby');
    $router->map('POST', '/restaruants/search', 'Restaurants#search');
    $router->map('GET', '/restaruants/id', 'Restaurants#getIds');
    $router->map('GET', '/replys/[i:store_id]', 'Replys#getAll');
    $router->map('POST', '/replys', 'Replys#create');
    $router->map('PUT', '/replys', 'Replys#update');
    $router->map('DELETE', '/replys', 'Replys#remove');
    $router->map('GET', '/replys/[i:store_id]/[i:id]', 'Replys#getOne');
    
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
