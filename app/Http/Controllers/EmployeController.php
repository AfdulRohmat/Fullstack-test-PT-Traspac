<?php

namespace App\Http\Controllers;

use App\Http\Resources\EmployeResource;
use App\Models\Employe;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;

class EmployeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $pageSize = $request->page_size ?? 10;
        $page = $request->page ?? 1;
        $employes = Employe::paginate($pageSize);


        return ((EmployeResource::collection($employes->loadMissing(['group:id,name', 'echelon:id,echelon', 'position:id,name', 'religion:id,religion', 'work_unit:id,work_unit'])))->additional([
            'meta' => [
                'code' => 200,
                'status' => 'success',
                'message' => "Create data successfully."
            ],
            'current_page' => $page,
            'per_page' => $pageSize,
            'from' => 1,
            'last_page' => $employes->lastPage(),
            'total' => Employe::count(),
        ]));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nip' => ['required', 'string', 'min:5', 'max:255'],
            'fullname' => ['required', 'string', 'min:5', 'max:255'],
            'tempat_lahir' => ['required', 'string', 'min:5', 'max:255'],
            'tanggal_lahir' => ['required', 'string', 'min:5', 'max:255'],
            'jenis_kelamin' => ['required', 'string', 'min:1', 'max:1'],
            'alamat' => ['required', 'string', 'min:5', 'max:255'],
            'picture' => ['required', 'string', 'min:5', 'max:255'],
            'no_HP' => ['required', 'string', 'min:5', 'max:255'],
            'npwp' => ['required', 'string', 'min:5', 'max:255'],
            'group_id' =>  ['required'],
            'echelon_id' =>  ['required'],
            'position_id' =>  ['required'],
            'tempat_tugas' =>  ['required', 'string', 'max:255'],
            'religion_id' =>  ['required'],
            'work_unit_id' =>  ['required'],
        ]);

        $employe = Employe::create($request->all());

        return ((new EmployeResource($employe->loadMissing(['group:id,name', 'echelon:id,echelon', 'position:id,name', 'religion:id,religion', 'work_unit:id,work_unit'])))->additional([
            'meta' => [
                'code' => 200,
                'status' => 'success',
                'message' => "Create data successfully."
            ],
        ]));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $request->validate([
            'nip' => ['required', 'string', 'min:5', 'max:255'],
            'fullname' => ['required', 'string', 'min:5', 'max:255'],
            'tempat_lahir' => ['required', 'string', 'min:5', 'max:255'],
            'tanggal_lahir' => ['required', 'string', 'min:5', 'max:255'],
            'jenis_kelamin' => ['required', 'string', 'min:1', 'max:1'],
            'alamat' => ['required', 'string', 'min:5', 'max:255'],
            'picture' => ['required', 'string', 'min:5', 'max:255'],
            'no_HP' => ['required', 'string', 'min:5', 'max:255'],
            'npwp' => ['required', 'string', 'min:5', 'max:255'],
            'group_id' =>  ['required'],
            'echelon_id' =>  ['required'],
            'position_id' =>  ['required'],
            'tempat_tugas' =>  ['required', 'string', 'max:255'],
            'religion_id' =>  ['required'],
            'work_unit_id' =>  ['required'],
        ]);

        $employe = Employe::findOrFail($id);

        $employe->update($request->all());

        return ((new EmployeResource($employe->loadMissing(['group:id,name', 'echelon:id,echelon', 'position:id,name', 'religion:id,religion', 'work_unit:id,work_unit'])))->additional([
            'meta' => [
                'code' => 200,
                'status' => 'success',
                'message' => "Update data successfully."
            ],
        ]));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $employe = Employe::findOrFail($id);
        $employe->delete();

        return response()->json([
            'meta' => [
                'code' => 200,
                'status' => 'Success',
                'message' => "Data deleted successfully "
            ],
            'data' => []
        ], 200);
    }
}
