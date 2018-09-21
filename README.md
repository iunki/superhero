# СТ ВЕБКИТ

СТ ВЕБКИТ - шаблон для нового проекта на базе Vue.js, Vuex, Vuetify и Axios.

Содержит пример работы со шлюзом и CRM BPM Online, включая CRUD-операции над универсальными объектами и запуск процесса в CRM.

## **Краткая информация по корректной установке и настройке основных компонет проекта**

### **1. Установка Node.js и npm**

#####  ***Вариант 1.*** Установка с [**Официального сайта**](https://nodejs.org/en/):
  - Для этого Вам необходимо просто перейти на страницу [**Официального сайта Node.js**](https://nodejs.org/en/) и скачать актуальную версию;
  - Либо, Вы можете увидеть список актуальных версий для различных ОС и [**скачать здесь**](https://nodejs.org/en/download/);

##### ***Вариант 2.*** Установка с помощью [**Scoop**](#работа-с-scoop-и-что-это-такое):
 - Для этого Вам достаточно в консоли **Windows PowerShell** запустить команду:

```powershell
scoop install -g nodejs-lts
```

<!-- blank line -->
----
<!-- blank line -->
### **2. Установка и запуск проекта**

 - Установка зависимостей и запуск:
```console
npm install
npm start
```

 - Запуск с "горячей" перезагрузкой:
```console
npm run dev
```
    *Репозиторий проекта будет доступен по ссылке: `http://localhost:8080`*

 - Сборка для публикации:
```console
npm run build
```

<!-- blank line -->
----
<!-- blank line -->
> ### **Работа с Scoop и что это такое**
> 
> **Scoop** - консольная утилита, позволяющая устанавливать в Windows различные программы по аналогии с yum или apt в *nix-системах.
> 
> Более подробную информацию можно узнать на [**домашней странице проекта**](http://scoop.sh) и в репозитории [**GitHub**](https://github.com/lukesampson/scoop) .
> 
> #### Установка Scoop
>  - Перед установкой **scoop** необходимо установить **Windows PowerShell** версии 3.0 и выше (не > требуется для Windows 10) и **.NET Framework** версии 4.5 и выше:  
>    - [**Windows PowerShell 3.0**](https://www.microsoft.com/en-us/download/details.aspx?id=34595)
>    - [**Windows PowerShell 5.1**](https://www.microsoft.com/en-us/download/details.aspx?id=54616) 
>    - [**.NET Framework 4.5**](https://www.microsoft.com/net/download) 
> 
>  - После установки запустить **Windows PowerShell** от имени администратора и выполнить следующие > действия:
>     - Для избежания ошибок с политиками безопасности выполнить следующую команду:
> 
>     ```powershell
>     Set-ExecutionPolicy RemoteSigned -scope CurrentUser
>     ```
>     - После этого выполнить команду для установки **Scoop**:
> 
>     ```powershell
>     iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
>     ```
>  - Теперь все готово для работы!
> 
> Полноценное описание работы с **Scoop** можно найти в [**Scoop Wiki**](https://github.com/lukesampson/scoop/wiki) и полный набор поддерживаемых программ для установки [**здесь**](https://github.com/lukesampson/scoop/tree/master/bucket) .
