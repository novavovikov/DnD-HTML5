var dragSrcEl = null;

function handleDragStart(e) {
    this.classList.add('draggable');

    dragSrcEl = this;
    
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) e.preventDefault();
  
    e.dataTransfer.dropEffect = 'move';  
  
    return false;
}

function handleDragEnter(e) {
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); 
    }

    if (dragSrcEl != this) {
        // Set the source column's HTML to the HTML of the column we dropped on.
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }

    dragSrcEl.classList.remove('draggable');
    return false;
}

function handleDragEnd(e) {
    [].forEach.call(cols, function (col) {
        col.classList.remove('over');
    });
}

var cols = [].slice.call(document.querySelectorAll('.column'));

cols.forEach(function(col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragenter', handleDragEnter, false)
    col.addEventListener('dragover', handleDragOver, false);
    col.addEventListener('dragleave', handleDragLeave, false);
    col.addEventListener('drop', handleDrop, false);
    col.addEventListener('dragend', handleDragEnd, false);
});