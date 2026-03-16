<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);
$projectId = (int) ($_GET['id'] ?? 0);

if ($projectId <= 0) {
    send_response('Project ID required', 400);
}

require_project_access($mysqli, $user, $projectId);

$stmt = $mysqli->prepare('SELECT * FROM projects WHERE id = ? LIMIT 1');
$stmt->bind_param('i', $projectId);
$stmt->execute();
$result = $stmt->get_result();
$project = $result ? $result->fetch_assoc() : null;

if (!$project) {
    send_response('Project not found', 404);
}

send_response(['project' => $project]);
