<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);
$projectId = (int) ($receivedData['project_id'] ?? 0);
$title = trim($receivedData['title'] ?? '');
$target = $receivedData['target_date'] ?? null;
$status = $receivedData['status'] ?? 'planned';

if ($projectId <= 0 || $title === '' || !$target) {
    send_response('Project, title and target date are required', 400);
}

require_project_access($mysqli, $user, $projectId);

$stmt = $mysqli->prepare('INSERT INTO milestones (project_id, title, target_date, status) VALUES (?, ?, ?, ?)');
$stmt->bind_param('isss', $projectId, $title, $target, $status);
$stmt->execute();

send_response(['milestone_id' => $stmt->insert_id], 201);
