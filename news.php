<?php
$newsFolder = "news/";
$newsFiles = glob($newsFolder . "*.txt");

foreach ($newsFiles as $file) {
    $filename = basename($file, ".txt");
    $content = file_get_contents($file);
    $lines = explode("\n", $content);
    $postedAt = date("F j, Y", filectime($file)); // Get creation timestamp
    $modifiedAt = date("F j, Y", filemtime($file)); // Get modification timestamp

    // Generate HTML for news card
    echo "<div class='news-card'>";
    echo "<h2>$filename</h2>";
    echo "<p>" . substr($lines[0], 0, 100) . "...</p>"; // Display a preview of the content
    echo "<p>Posted at: $postedAt</p>";
    echo "<p>Modified at: $modifiedAt</p>";
    echo "<a href='news_detail.php?file=$filename'>Read More</a>"; // Link to full news content
    echo "</div>";
}
?>
