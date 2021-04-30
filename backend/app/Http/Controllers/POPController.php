<?php

namespace App\Http\Controllers;

use App\Models\POP;
use Exception;
use Illuminate\Http\Request;

class POPController extends Controller
{
    //function to create a POP
    public function store(Request $request){
        $pop = new POP;
        $pop->localisation = $request->localisation;
        $pop->client_id = $request->client_id;
        $pop->olt_id = $request->olt_id;
        $pop->bst_id = $request->bst_id;

        try {
            $pop->save();
        } catch (Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }

        return response()->json(['status' => "Ajout avec succès du POP"], 200);
    }

    
    //function to update a pop
    public function update(Request $request){
        $pop = POP::find($request->id);
        $pop->localisation = $request->localisation;
        $pop->client_id = $request->client_id;
        $pop->olt_id = $request->olt_id;
        $pop->bst_id = $request->bst_id;

        try {
            $pop->save();
        } catch (Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }

        return response()->json(['status' => "Modification réussie du POP"], 200);
    }

    //function to get all pops
    public function getAll(){
        return POP::all();
    }

    //function to delete a pop
    public function delete(Request $request){
        try {
            POP::find($request->id)->delete();
        } catch (Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }

        return response()->json(['status' => "Suppression réussie"], 200);
    }
}
