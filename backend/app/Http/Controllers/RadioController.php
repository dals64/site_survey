<?php

namespace App\Http\Controllers;

use App\Models\Radio;
use Exception;
use Illuminate\Http\Request;

class RadioController extends Controller
{
    //function to create a radio
    public function store(Request $request){
        $radio = new Radio;
        $radio->mac_address = $request->mac_address;
        $radio->serial_number = $request->serial_number;

        try {
            $radio->save();
        } catch (Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }

        return response()->json(['status' => 'Ajout de radio réussi'], 200);
    }


    //function to update a radio
    public function update(Request $request){
        $radio = Radio::find($request->id);
        $radio->mac_address = $request->mac_address;
        $radio->serial_number = $request->serial_number;

        try {
            $radio->save();
        } catch (Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }

        return response()->json(['status' => 'Modification de radio réussie'], 200);
    }
    

    //function to get all radios
    public function getAll(){
        return Radio::all();
    }


    //function to delete a radio
    public function delete(Request $request){
        try {
            Radio::find($request->id)->delete();
        } catch (Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }

        return response()->json(['status' => 'Suppression de radion réussie'], 200);
    }
}
