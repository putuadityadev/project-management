<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        $query = Project::query();
        if(request("name")) {
            $query->where('name', 'like', '%' . request("name") . '%');
        }
        if(request("status")) {
            $query->where('status', 'like', '%' . request("status") . '%');
        }

        $projects = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);
        return Inertia::render('Projects/Index', [
            "projects" => ProjectResource::collection($projects),
            "queryParams" => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Projects/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();
        if($image) {
            $data['image_path'] = $image->store('projects', 'public');
        }
        Project::create($data);
        return to_route("project.index")->with('success', "Project created successfully.");
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "asc");

        $query = $project->tasks();
        if(request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if(request("status")) {
            $query->where("status", "like", "%" . request("status") . "%");
        }

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);
        return inertia("Projects/Show", [
            "project" => new ProjectResource($project),
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => request()->query() ?: null
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('Projects/Edit',[
            "project" => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = auth()->id();
        if($image) {
            if($project->image_path) {
                Storage::disk('public')->delete($project->image_path);
            }
            $data['image_path'] = $image->store('projects', 'public');
        }
        $project->update($data);
        return to_route("project.index")->with('success', "Project {$project->id} updated successfully.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();
        if($project->image_path){
            Storage::disk('public')->delete($project->image_path);
        }

        return to_route("project.index")->with('success', "Project {$project->id} deleted successfully.");
    }
}
