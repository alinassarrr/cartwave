<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Traits\RespondsWithJson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller {
    
    public function index() {
        $notifications = Notification::where('user_id', Auth::id())
            ->orderByDesc('created_at')
            ->get();

        return $this->responseJSON($notifications);
    }

    public function markAsRead($id) {
        $notification = Notification::where('id', $id)
            ->where('user_id', Auth::id())
            ->first();

        if (! $notification) {
            return $this->responseJSON(null, 'error', 404);
        }

        $notification->update([
            'is_read' => true,
            'read_at' => now(),
        ]);

        return $this->responseJSON(['message' => 'Notification marked as read.']);
    }

    public function markAllAsRead() {
        Notification::where('user_id', Auth::id())
            ->where('is_read', false)
            ->update([
                'is_read' => true,
                'read_at' => now(),
            ]);

        return $this->responseJSON(['message' => 'All notifications marked as read.']);
    }
    public function adminIndex() {
        $notifications = Notification::with('user')
            ->orderByDesc('created_at')
            ->paginate(20);

        return $this->responseJSON($notifications);
    }

    public function store(Request $request) {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'message' => 'required|string',
            'type' => 'nullable|string|max:50',
        ]);

        $notification = Notification::create([
            'user_id' => $request->user_id,
            'title' => $request->title,
            'message' => $request->message,
            'type' => $request->type ?? 'info',
            'is_read' => false,
        ]);

        return $this->responseJSON($notification, 'Notification created successfully.', 201);
    }

    public function update(Request $request, $id) {
        $notification = Notification::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'message' => 'sometimes|required|string',
            'type' => 'nullable|string|max:50',
            'is_read' => 'boolean',
        ]);

        $notification->update($request->only(['title', 'message', 'type', 'is_read']));

        if ($request->has('is_read') && $request->is_read) {
            $notification->update(['read_at' => now()]);
        }

        return $this->responseJSON($notification, 'Notification updated successfully.');
    }

    public function destroy($id) {
        $notification = Notification::findOrFail($id);
        $notification->delete();

        return $this->responseJSON(null, 'Notification deleted successfully.');
    }

}