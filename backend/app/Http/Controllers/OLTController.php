<?php

namespace App\Http\Controllers;

use App\Models\OLT;
use Exception;
use Illuminate\Http\Request;

class OLTController extends Controller
{
    //function to create an OLT
    public function store(Request $request)
    {
        $olt = new OLT;
        $olt->mac_address = $request->mac_address;
        $olt->serial_number = $request->serial_number;

        try {
            $olt->save();
        } catch (Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }

        return response()->json(['status' => "Ajout avec succès de l'OLT"], 200);
    }


    //function to update an OLT
    public function update(Request $request)
    {
        $olt = OLT::find($request->id);
        $olt->mac_address = $request->mac_address;
        $olt->serial_number = $request->serial_number;

        try {
            $olt->save();
        } catch (Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }

        return response()->json(['status' => "Modification réussie de l'OLT"], 200);
    }


    //function to get all OLTs
    public function getAll()
    {
        return OLT::all();
    }


    //function to delete an OLT
    public function delete(Request $request)
    {
        try {
            OLT::find($request->id)->delete();
        } catch (Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }

        return response()->json(['status' => "Suppression réussie"], 200);
    }
}
