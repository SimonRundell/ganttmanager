<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);
$projectId = (int) ($_GET['projectId'] ?? 0);

if ($projectId <= 0) {
    send_response('Project ID required', 400);
}

require_project_access($mysqli, $user, $projectId);

$projectStmt = $mysqli->prepare('SELECT * FROM projects WHERE id = ?');
$projectStmt->bind_param('i', $projectId);
$projectStmt->execute();
$projectResult = $projectStmt->get_result();
$project = $projectResult ? $projectResult->fetch_assoc() : null;

if (!$project) {
    send_response('Project not found', 404);
}

$countStmt = $mysqli->prepare('SELECT COUNT(*) AS task_count, AVG(progress) AS avg_progress FROM tasks WHERE project_id = ?');
$countStmt->bind_param('i', $projectId);
$countStmt->execute();
$counts = $countStmt->get_result()->fetch_assoc();

send_response([
    'project' => $project,
    'stats' => $counts
]);
