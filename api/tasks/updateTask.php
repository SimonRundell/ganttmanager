<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);
$taskId = (int) ($receivedData['id'] ?? 0);

if ($taskId <= 0) {
    send_response('Task ID required', 400);
}

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

require_project_access($mysqli, $user, $projectId);

$stmt = $mysqli->prepare('UPDATE tasks SET parent_task_id = ?, wbs_code = ?, title = ?, description = ?, start_date = ?, end_date = ?, progress = ?, status = ?, wbs_order = ? WHERE id = ?');
$stmt->bind_param('isssssisii', $parentId, $wbsCode, $title, $description, $start, $end, $progress, $status, $wbsOrder, $taskId);
$stmt->execute();

send_response('Task updated');
