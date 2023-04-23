<?php

namespace App\Http\Controllers;

use App\Http\Resources\EmployeResource;
use App\Models\Employe;
use App\Models\User;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;

// require 'vendor/autoload.php';

use ImageKit\ImageKit;

class EmployeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->per_page ?? 10;
        $search = $request->search ?? '';
        $employes_query = Employe::with(['group:id,name', 'echelon:id,echelon', 'position:id,name', 'religion:id,religion', 'work_unit:id,work_unit']);

        // search
        if ($search) {
            //  $nipSearch = $employes_query->where('nip', 'LIKE', '%' . $search . '%');
            $employes_query->where('fullname', 'LIKE', '%' . $search . '%')->get();
        }

        // pagination
        if ($request->page) {
            $employes = $employes_query->orderBy('created_at', 'ASC')->paginate($perPage);
        } else {
            $employes = $employes_query->get();
        }


        return response()->json([
            'meta' => [
                'code' => 200,
                'status' => 'Success',
                'message' => "Get data successfully"
            ],
            'data' => $employes
        ], 200);
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
        $user = User::findOrFail(auth()->id());
        $request->validate([
            'nip' => ['required', 'string', 'min:5', 'max:255'],
            'fullname' => ['required', 'string', 'min:1', 'max:255'],
            'tempat_lahir' => ['required', 'string', 'min:1', 'max:255'],
            'tanggal_lahir' => ['required', 'string', 'min:1', 'max:255'],
            'jenis_kelamin' => ['required', 'string', 'min:1', 'max:1'],
            'alamat' => ['required', 'string', 'min:1', 'max:255'],
            'pictureFile' => ['required', 'image', 'mimes:jpg,jpeg,bmp,png'],
            'no_HP' => ['required', 'string', 'min:1', 'max:255'],
            'npwp' => ['required', 'string', 'min:1', 'max:255'],
            'group_id' =>  ['required'],
            'echelon_id' =>  ['required'],
            'position_id' =>  ['required'],
            'tempat_tugas' =>  ['required', 'string', 'max:255'],
            'religion_id' =>  ['required'],
            'work_unit_id' =>  ['required'],
        ]);

        $imageKit = new ImageKit(
            env('IMAGEKIT_PUBLIC_KEY'),
            env('IMAGEKIT_PRIVATE_KEY'),
            env('IMAGEKIT_ENDPOINT_URL'),
        );

        $image = base64_encode(file_get_contents($request->file('pictureFile')));
        $uploadImage = $imageKit->uploadFile(
            [
                'file' => $image,
                'fileName' => $user->email,
                'folder' => '/employe'
            ]
        );
        $imageUrl = $uploadImage->result->url;

        $request['picture'] = $imageUrl;
        $employe = Employe::create($request->all());
        // $employe->picture = $imageUrl;

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
        $employe = Employe::with(['group:id,name', 'echelon:id,echelon', 'position:id,name', 'religion:id,religion', 'work_unit:id,work_unit'])->findOrFail($id);
        return response()->json([
            'meta' => [
                'code' => 200,
                'status' => 'Success',
                'message' => "Get data successfully"
            ],
            'data' => $employe->makeHidden([
                'group_id',
                'echelon_id',
                'position_id',
                'religion_id',
                'work_unit_id',
                'deleted_at',
                'created_at',
                'updated_at',
            ])
        ], 200);
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
        $user = User::findOrFail(auth()->id());
        $request->validate([
            'nip' => ['required', 'string', 'min:5', 'max:255'],
            'fullname' => ['required', 'string', 'min:5', 'max:255'],
            'tempat_lahir' => ['required', 'string', 'min:5', 'max:255'],
            'tanggal_lahir' => ['required', 'string', 'min:5', 'max:255'],
            'jenis_kelamin' => ['required', 'string', 'min:1', 'max:1'],
            'alamat' => ['required', 'string', 'min:5', 'max:255'],
            'pictureFile' => ['nullable', 'image', 'mimes:jpg,jpeg,bmp,png'],
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
        if ($request->hasFile('pictureFile')) {
            $imageKit = new ImageKit(
                env('IMAGEKIT_PUBLIC_KEY'),
                env('IMAGEKIT_PRIVATE_KEY'),
                env('IMAGEKIT_ENDPOINT_URL'),
            );

            $image = base64_encode(file_get_contents($request->file('pictureFile')));
            $uploadImage = $imageKit->uploadFile(
                [
                    'file' => $image,
                    'fileName' => $user->email,
                    'folder' => '/employe'
                ]
            );
            $imageUrl = $uploadImage->result->url;
            $request['picture'] = $imageUrl;
        }
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
