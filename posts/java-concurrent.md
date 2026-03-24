# Java 并发编程

## 线程池

Java 提供了 ExecutorService 来管理线程池。

## 常用线程池类型

### FixedThreadPool
固定大小的线程池

### CachedThreadPool
可缓存的线程池

### ScheduledThreadPool
支持定时任务的线程池

## 使用示例

```java
ExecutorService executor = Executors.newFixedThreadPool(10);
executor.submit(() -> {
    System.out.println("任务执行");
});
executor.shutdown();
```

**合理使用线程池可以提高程序性能！**
