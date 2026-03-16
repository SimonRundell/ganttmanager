<?php
include '../setup.php';
include '../helpers.php';

$user = require_auth($config, $mysqli);
$projectId = (int) ($_GET['projectId'] ?? 0);

if ($projectId <= 0) {
    send_response('Project ID required', 400);
}

require_project_access($mysqli, $user, $projectId);

$stmt = $mysqli->prepare('SELECT * FROM milestones WHERE project_id = ? ORDER BY target_date');
$stmt->bind_param('i', $projectId);
$stmt->execute();
$result = $stmt->get_result();

$milestones = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $milestones[] = $row;
    }
}

send_response(['milestones' => $milestones]);
