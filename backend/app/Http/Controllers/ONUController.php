<?php

namespace App\Http\Controllers;

use App\Models\ONU;
use Exception;
use Illuminate\Http\Request;

class ONUController extends Controller
{
    //function to create an ONU
    public function store(Request $request)
    {
        $onu = new ONU;
        $onu->ip_address = $request->ip_address;
        $onu->client_id = $request->client_id;
        $onu->mac_address = $request->mac_address;

        try {
            $onu->save();
        } catch (Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }

        return response()->json(['status' => "Ajout avec succès de l'ONU"], 200);
    }


    //function to update an ONU
    public function update(Request $request)
    {
        $onu = ONU::find($request->id);
        $onu->ip_address = $request->ip_address;
        $onu->client_id = $request->client_id;
        $onu->mac_address = $request->mac_address;

        try {
            $onu->save();
        } catch (Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }

        return response()->json(['status' => "Modification réussie de l'ONU"], 200);
    }


    //function to get all ONUs
    public function getAll()
    {
        return ONU::all();
    }


    //function to delete an ONU
    public function delete(Request $request)
    {
        try {
            ONU::find($request->id)->delete();
        } catch (Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }

        return response()->json(['status' => "Suppression réussie"], 200);
    }
}
