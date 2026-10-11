function renderMarkdown(text) {
    if (!text) return '';
    var map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    var escaped = text.replace(/[&<>"']/g, function(m) { return map[m]; });
    var codeBlocks = [];
    escaped = escaped.replace(/```(\w*)\n([\s\S]*?)```/g, function(m, lang, code) {
        codeBlocks.push('<pre><code>' + code + '</code></pre>');
        return '___CODE' + (codeBlocks.length - 1) + '___';
    });
    escaped = escaped.replace(/^###### (.*)$/gm, '<h6>$1</h6>');
    escaped = escaped.replace(/^##### (.*)$/gm, '<h5>$1</h5>');
    escaped = escaped.replace(/^#### (.*)$/gm, '<h4>$1</h4>');
    escaped = escaped.replace(/^### (.*)$/gm, '<h3>$1</h3>');
    escaped = escaped.replace(/^## (.*)$/gm, '<h2>$1</h2>');
    escaped = escaped.replace(/^# (.*)$/gm, '<h1>$1</h1>');
    escaped = escaped.replace(/^---$/gm, '<hr>');
    escaped = escaped.replace(/^> (.*)$/gm, '<blockquote>$1</blockquote>');
    escaped = escaped.replace(/`([^`]+)`/g, '<code>$1</code>');
    escaped = escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    escaped = escaped.replace(/\*(.+?)\*/g, '<em>$1</em>');
    escaped = escaped.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function(m, t, u) {
        if (u.match(/^(https?:|mailto:|\/)/i)) { return '<a href="' + u + '" target="_blank">' + t + '</a>'; }
        return t;
    });
    escaped = escaped.replace(/((?:^- .+$\n?)+)/gm, function(m) {
        var items = m.trim().split('\n').map(function(l) { return '<li>' + l.replace(/^- /, '') + '</li>'; }).join('');
        return '<ul>' + items + '</ul>';
    });
    escaped = escaped.replace(/((?:^\d+\. .+$\n?)+)/gm, function(m) {
        var items = m.trim().split('\n').map(function(l) { return '<li>' + l.replace(/^\d+\. /, '') + '</li>'; }).join('');
        return '<ol>' + items + '</ol>';
    });
    escaped = escaped.replace(/\n\n+/g, '</p><p>');
    escaped = '<p>' + escaped + '</p>';
    escaped = escaped.replace(/___CODE(\d+)___/g, function(m, idx) { return codeBlocks[parseInt(idx)]; });
    return escaped;
}
