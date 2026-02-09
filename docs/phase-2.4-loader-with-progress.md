# Phase 2.4 - Loader with Progress Bar

## Overview
Implement a modern loading progress bar using shadcn/ui progress component for the Next.js/React project. This replaces the oldschool XHR-based progress tracking with contemporary React patterns and modern web APIs.

## Reference Implementation
Based on the loader example in `docs/resources/loader.html`, which demonstrates:
- Percentage-based progress tracking (0-100%)
- Loading state management
- XMLHttpRequest progress events
- Conditional rendering between loader and content

## Modern Implementation Approach

### Modern Progress Tracking Methods

#### 1. Resource Loading Progress
**For Assets/Images:**
```javascript
const loadResources = async (resources) => {
  const progress = new ProgressTracker();
  
  const loadPromises = resources.map(async (resource) => {
    const response = await fetch(resource);
    const contentLength = response.headers.get('content-length');
    
    let loaded = 0;
    const reader = response.body.getReader();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      loaded += value.length;
      progress.update(loaded / parseInt(contentLength) * 100);
    }
  });
  
  await Promise.all(loadPromises);
};
```

#### 2. Route/Navigation Loading
**For Next.js Route Changes:**
```javascript
const RouterProgress = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleRouteChangeStart = () => setProgress(10);
    const handleRouteChangeComplete = () => setProgress(100);
    
    Router.events.on('routeChangeStart', handleRouteChangeStart);
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);
    
    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart);
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);
};
```

#### 3. API/Data Loading Progress
**For Multiple API Calls:**
```javascript
const useApiProgress = (apiCalls) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    let completed = 0;
    const total = apiCalls.length;
    
    const updateProgress = () => {
      completed++;
      setProgress((completed / total) * 100);
    };
    
    apiCalls.forEach(call => {
      call().then(updateProgress).catch(updateProgress);
    });
  }, [apiCalls]);
};
```

#### 4. Component-Based Progress
**For Component/Bundle Loading:**
```javascript
const LazyComponentProgress = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const startTime = Date.now();
    const duration = 2000; // Simulated loading time
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsLoading(false);
      }
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
};
```

## Technical Requirements

### Core Components
- **shadcn/ui Progress Component**: Base progress bar component
- **React Hooks**: useState, useEffect for state management
- **Modern APIs**: Fetch API, Intersection Observer, Performance API
- **TypeScript**: Type-safe progress tracking

### Progress Tracking Strategies

#### 1. Asset Bundle Loading
```javascript
const AssetLoader = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadBundles = async () => {
      const bundles = ['main.js', 'vendor.js', 'styles.css'];
      let loadedCount = 0;
      
      for (const bundle of bundles) {
        await loadScript(bundle);
        loadedCount++;
        setProgress((loadedCount / bundles.length) * 100);
      }
      
      setIsLoading(false);
    };
    
    loadBundles();
  }, []);
  
  return (
    <Progress value={progress} className="w-[60%]" />
  );
};
```

#### 2. Image Gallery Loading
```javascript
const ImageGalleryProgress = ({ images }) => {
  const [progress, setProgress] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set());
  
  useEffect(() => {
    if (images.length === 0) return;
    
    const handleImageLoad = (index) => {
      setLoadedImages(prev => new Set(prev).add(index));
    };
    
    const newProgress = (loadedImages.size / images.length) * 100;
    setProgress(newProgress);
  }, [loadedImages.size, images.length]);
  
  return (
    <Progress value={progress} max={100} />
  );
};
```

#### 3. Form Submission Progress
```javascript
const FormProgress = ({ onSubmit }) => {
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    setProgress(10);
    
    try {
      // Validation
      setProgress(30);
      
      // API call
      const response = await submitForm(data);
      setProgress(70);
      
      // Processing response
      await processResponse(response);
      setProgress(100);
      
    } catch (error) {
      setProgress(0);
    } finally {
      setIsSubmitting(false);
    }
  };
};
```

## Implementation Details

### shadcn/ui Progress Integration
```jsx
import { Progress } from "@/components/ui/progress";

const LoadingBar = ({ value, isLoading }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Progress value={value} className="w-[60%]" />
      <p className="text-sm text-muted-foreground">
        {Math.round(value)}% Complete
      </p>
    </div>
  );
};
```

### Advanced Features

#### 1. Multi-Stage Progress
```javascript
const MultiStageProgress = () => {
  const [stages, setStages] = useState([
    { name: 'Loading', progress: 0, complete: false },
    { name: 'Processing', progress: 0, complete: false },
    { name: 'Finalizing', progress: 0, complete: false }
  ]);
  
  const overallProgress = stages.reduce((acc, stage) => 
    acc + (stage.complete ? 100 : stage.progress) / stages.length, 0
  );
};
```

#### 2. Estimated Time Remaining
```javascript
const useTimeRemaining = (progress, startTime) => {
  const [timeRemaining, setTimeRemaining] = useState(null);
  
  useEffect(() => {
    if (progress > 0 && progress < 100) {
      const elapsed = Date.now() - startTime;
      const estimatedTotal = (elapsed / progress) * 100;
      const remaining = estimatedTotal - elapsed;
      
      setTimeRemaining(Math.max(0, remaining));
    }
  }, [progress, startTime]);
  
  return timeRemaining;
};
```

#### 3. Pause/Resume Functionality
```javascript
const ResumableProgress = () => {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  
  const pauseProgress = () => {
    setResumeData({ progress, timestamp: Date.now() });
    setIsPaused(true);
  };
  
  const resumeProgress = () => {
    if (resumeData) {
      setProgress(resumeData.progress);
      setIsPaused(false);
    }
  };
};
```

## Accessibility Requirements
- Screen reader announcements for progress changes
- ARIA attributes for progress indicators
- Keyboard navigation for pause/resume controls
- High contrast mode support
- Reduced motion preferences

## Performance Considerations
- Debounce rapid progress updates
- Use requestAnimationFrame for smooth animations
- Implement cleanup for unfinished operations
- Memory management for long-running processes

## Error Handling
- Network timeout handling
- Failed resource recovery
- User cancellation support
- Graceful degradation strategies

## Integration Points
- Page navigation transitions
- File upload progress
- Data synchronization
- Asset bundle loading
- Multi-step forms

## Testing Requirements
- Progress accuracy testing
- Performance under load
- Accessibility compliance
- Error scenario handling
- Cross-browser compatibility

## Deliverables
1. shadcn/ui Progress component integration
2. Multiple progress tracking strategies
3. Accessibility-compliant implementation
4. Error handling and recovery
5. Performance optimization
6. TypeScript type definitions
7. Documentation and examples
8. Unit and integration tests