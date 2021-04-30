<?php

namespace App\Http\Controllers;

use App\Models\BST;
use Exception;
use Illuminate\Http\Request;

class BSTController extends Controller
{
    //function to create a new bst
    public function store(Request $request){

        $bst = new BST;
        $bst->serial_number = $request->serial_number;
        $bst->mac_address = $request->mac_address;
        $bst->radio_id = $request->radio_id;

        try {
            $bst->save();
        } catch (Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }

        return response()->json(['status' => 'Ajout avec succès de la BST'], 200);
    }


    //function to update a bst
    public function update(Request $request){
        $bst = BST::find($request->id);
        $bst->serial_number = $request->serial_number;
        $bst->mac_address = $request->mac_address;
        $bst->radio_id = $request->radio_id;

        try {
            $bst->save();
        } catch (Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }

        return response()->json(['status' => 'Modification avec succès de la BST'], 200);
    }


    //function to delete a bst
    public function delete(Request $request){

        $bst = BST::find($request->id);

        try {
            $bst->delete();
        } catch (Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }

        return response()->json(['status' => 'Suppression de BST réussie'], 200);
    }

    //function to get all bst
    public function getAll(){
        try {
            $bsts = BST::all();
        } catch (Exception $exception) {
            return back()->withError($exception->getMessage())->withInput();
        }

        return $bsts;
    }

}
