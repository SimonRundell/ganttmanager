<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);
$projectId = (int) ($_GET['projectId'] ?? 0);

if ($projectId <= 0) {
    send_response('Project ID required', 400);
}

require_project_access($mysqli, $user, $projectId);

$stmt = $mysqli->prepare('SELECT * FROM tasks WHERE project_id = ? ORDER BY wbs_order ASC');
$stmt->bind_param('i', $projectId);
$stmt->execute();
$result = $stmt->get_result();

$tasks = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $tasks[] = $row;
    }
}

send_response(['tasks' => $tasks]);
