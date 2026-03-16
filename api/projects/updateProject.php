<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);
$projectId = (int) ($receivedData['id'] ?? 0);

if ($projectId <= 0) {
    send_response('Project ID required', 400);
}

require_project_access($mysqli, $user, $projectId);

$title = trim($receivedData['title'] ?? '');
$description = trim($receivedData['description'] ?? '');
$status = $receivedData['status'] ?? 'planning';
$priority = $receivedData['priority'] ?? 'medium';
$start = $receivedData['start_date'] ?? null;
$end = $receivedData['end_date'] ?? null;
$colour = $receivedData['colour'] ?? '#2563EB';

$stmt = $mysqli->prepare('UPDATE projects SET title = ?, description = ?, status = ?, priority = ?, start_date = ?, end_date = ?, colour = ? WHERE id = ?');
$stmt->bind_param('sssssssi', $title, $description, $status, $priority, $start, $end, $colour, $projectId);
$stmt->execute();

send_response('Project updated');
