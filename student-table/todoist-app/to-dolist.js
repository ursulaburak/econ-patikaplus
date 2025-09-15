document.addEventListener('DOMContentLoaded', function() {
    // Elementleri seçme
    const todoForm = document.getElementById('todoForm');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');
    const liveToast = new bootstrap.Toast(document.getElementById('liveToast'));
    
    // Toast bildirimini gösterme fonksiyonu
    function showToast(title, message, isSuccess = true) {
        const toastTitle = document.getElementById('toastTitle');
        const toastMessage = document.getElementById('toastMessage');
        const toast = document.getElementById('liveToast');
        
        toastTitle.textContent = title;
        toastMessage.textContent = message;
        
        // Başarı durumuna göre arka plan rengi ayarla
        if (isSuccess) {
            toast.querySelector('.toast-header').classList.remove('bg-danger');
            toast.querySelector('.toast-header').classList.add('bg-success');
        } else {
            toast.querySelector('.toast-header').classList.remove('bg-success');
            toast.querySelector('.toast-header').classList.add('bg-danger');
        }
        
        liveToast.show();
    }
    
    // Local Storage'dan todoları yükle
    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            addTodoToDOM(todo.text, todo.completed, todo.id);
        });
    }
    
    // Yeni bir todo ekleme
    function addTodo(e) {
        e.preventDefault();
        
        const todoText = todoInput.value.trim();
        
        // Boş kontrolü
        if (!todoText) {
            showToast('Hata', 'Lütfen geçerli bir görev giriniz.', false);
            return;
        }
        
        // Yeni todo oluştur
        const newTodo = {
            id: Date.now(),
            text: todoText,
            completed: false
        };
        
        // DOM'a ekle
        addTodoToDOM(todoText, false, newTodo.id);
        
        // Local Storage'a kaydet
        saveTodoToLocalStorage(newTodo);
        
        // Input'u temizle
        todoInput.value = '';
        
        // Başarı bildirimi göster
        showToast('Başarılı', 'Görev başarıyla eklendi.');
    }
    
    // DOM'a todo ekleme
    function addTodoToDOM(todoText, completed, id) {
        const li = document.createElement('li');
        li.className = `list-group-item ${completed ? 'completed' : ''}`;
        li.dataset.id = id;
        
        li.innerHTML = `
            <span>${todoText}</span>
            <div class="todo-actions">
                <button class="btn btn-success btn-sm complete-btn">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn btn-danger btn-sm delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        todoList.appendChild(li);
    }
    
    // Local Storage'a todo kaydetme
    function saveTodoToLocalStorage(todo) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    // Todo'yu tamamlanmış olarak işaretle
    function toggleComplete(e) {
        if (e.target.classList.contains('complete-btn') || e.target.closest('.complete-btn')) {
            const li = e.target.closest('li');
            const id = parseInt(li.dataset.id);
            
            // DOM'da güncelle
            li.classList.toggle('completed');
            
            // Local Storage'da güncelle
            const todos = JSON.parse(localStorage.getItem('todos'));
            const updatedTodos = todos.map(todo => {
                if (todo.id === id) {
                    return {...todo, completed: !todo.completed};
                }
                return todo;
            });
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            
            // Bildirim göster
            const isCompleted = li.classList.contains('completed');
            showToast('Başarılı', `Görev ${isCompleted ? 'tamamlandı' : 'tamamlanmadı'} olarak işaretlendi.`);
        }
    }
    
    // Todo'yu sil
    function deleteTodo(e) {
        if (e.target.classList.contains('delete-btn') || e.target.closest('.delete-btn')) {
            const li = e.target.closest('li');
            const id = parseInt(li.dataset.id);
            
            // DOM'dan kaldır
            li.remove();
            
            // Local Storage'dan kaldır
            const todos = JSON.parse(localStorage.getItem('todos'));
            const updatedTodos = todos.filter(todo => todo.id !== id);
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            
            // Bildirim göster
            showToast('Başarılı', 'Görev başarıyla silindi.');
        }
    }
    
    // Event listener'ları ekle
    todoForm.addEventListener('submit', addTodo);
    todoList.addEventListener('click', toggleComplete);
    todoList.addEventListener('click', deleteTodo);
    
    // Sayfa yüklendiğinde todoları yükle
    loadTodos();
});