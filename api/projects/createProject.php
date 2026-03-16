<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);

$title = trim($receivedData['title'] ?? '');
$description = trim($receivedData['description'] ?? '');
$status = $receivedData['status'] ?? 'planning';
$priority = $receivedData['priority'] ?? 'medium';
$start = $receivedData['start_date'] ?? null;
$end = $receivedData['end_date'] ?? null;
$colour = $receivedData['colour'] ?? '#2563EB';

if ($title === '' || !$start || !$end) {
    send_response('Title, start date, and end date are required', 400);
}

$stmt = $mysqli->prepare('INSERT INTO projects (owner_id, title, description, status, priority, start_date, end_date, colour) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
$stmt->bind_param('isssssss', $user['id'], $title, $description, $status, $priority, $start, $end, $colour);
if (!$stmt->execute()) {
    send_response('Unable to create project', 500);
}

$projectId = $stmt->insert_id;
$member = $mysqli->prepare('INSERT INTO project_members (project_id, user_id, role) VALUES (?, ?, "owner")');
$member->bind_param('ii', $projectId, $user['id']);
$member->execute();

send_response(['project_id' => $projectId], 201);
