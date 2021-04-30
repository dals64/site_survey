<?php

namespace App\Http\Controllers;

use App\Models\Router;
use Exception;
use Illuminate\Http\Request;

class RouterController extends Controller
{
    //function to create a router
    public function store(Request $request)
    {
        $router = new Router;
        $router->maker = $request->maker;
        $router->model = $request->model;
        $router->serial_number = $request->serial_number;

        try {
            $router->save();
        } catch (Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }

        return response()->json(['status' => 'Ajout du routeur réussi'], 200);
    }


    //function to update a router
    public function update(Request $request)
    {
        $router = Router::find($request->id);
        $router->maker = $request->maker;
        $router->model = $request->model;
        $router->serial_number = $request->serial_number;

        try {
            $router->save();
        } catch (Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }

        return response()->json(['status' => 'Information du routeur mises à jour'], 200);
    }


    //function to get all routers
    public function getAll()
    {
        return Router::all();
    }


    //function to delete a router
    public function delete(Request $request)
    {
        try {
            Router::find($request->id)->delete();
        } catch (Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }

        return response()->json(['status' => 'Routeur supprimé'], 200);

    }
}
