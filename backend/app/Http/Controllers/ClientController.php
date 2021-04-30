<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Exception;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    //function to create a client
    public function store(Request $request){
        $client = new Client;
        $client->name = $request->name;
        $client->enterprise_type = $request->enterprise_type;
        $client->transmission_support = $request->transmission_support;
        $client->brandwidth = $request->brandwidth;
        $client->email = $request->email;
        $client->telephone = $request->telephone;
        $client->router_id = $request->router_id;
        $client->radio_id = $request->radio_id;

        try {
            $client->save();
        } catch (Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }

        return response()->json(['status' => 'Ajout de client réussi'], 200);
    }


    //function to update a client
    public function update(Request $request){
        $client = Client::find($request->id);
        $client->name = $request->name;
        $client->enterprise_type = $request->enterprise_type;
        $client->transmission_support = $request->transmission_support;
        $client->brandwidth = $request->brandwidth;
        $client->email = $request->email;
        $client->telephone = $request->telephone;
        $client->router_id = $request->router_id;
        $client->radio_id = $request->radio_id;

        try {
            $client->save();
        } catch (Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }

        return response()->json(['status' => 'Modification de client réussie'], 200);
    }


    //function to get all clients
    public function getAll(){
        return Client::all();
    }


    //function to delete a client
    public function delete(Request $request){
        try {
            Client::find($request->id)->delete();
        } catch (Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }

        return response()->json(['status' => 'Suppression de client réussie'], 200);
    }
}
