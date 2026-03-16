<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);

$projectId = (int) ($receivedData['project_id'] ?? 0);
$title = trim($receivedData['title'] ?? '');
$description = trim($receivedData['description'] ?? '');
$start = $receivedData['start_date'] ?? null;
$end = $receivedData['end_date'] ?? null;
$progress = (int) ($receivedData['progress'] ?? 0);
$status = $receivedData['status'] ?? 'planning';
$wbsCode = $receivedData['wbs_code'] ?? null;
$parentId = $receivedData['parent_task_id'] ?? null;
$wbsOrder = (int) ($receivedData['wbs_order'] ?? 0);

if ($projectId <= 0 || $title === '' || !$start || !$end) {
    send_response('Project, title, start and end dates are required', 400);
}

require_project_access($mysqli, $user, $projectId);

$stmt = $mysqli->prepare('INSERT INTO tasks (project_id, parent_task_id, wbs_code, title, description, start_date, end_date, progress, status, wbs_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
$stmt->bind_param('iisssssisi', $projectId, $parentId, $wbsCode, $title, $description, $start, $end, $progress, $status, $wbsOrder);
if (!$stmt->execute()) {
    send_response('Unable to create task', 500);
}

send_response(['task_id' => $stmt->insert_id], 201);
