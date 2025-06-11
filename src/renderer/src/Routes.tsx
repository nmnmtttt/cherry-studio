import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import AgentsPage from './pages/agents/AgentsPage'
import AppsPage from './pages/apps/AppsPage'
import FilesPage from './pages/files/FilesPage'
import HomePage from './pages/home/HomePage'
import KnowledgePage from './pages/knowledge/KnowledgePage'
import McpServersPage from './pages/mcp-servers'
import PaintingsRoutePage from './pages/paintings/PaintingsRoutePage'
import SettingsPage from './pages/settings/SettingsPage'
import TranslatePage from './pages/translate/TranslatePage'

const WILDCARD_ROUTES = ['/settings', '/paintings', '/mcp-servers']

const RouteContainer = () => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const [isReady, setIsReady] = useState(false)

  // 获取当前路径的主路由部分
  const mainPath = WILDCARD_ROUTES.find((route) => location.pathname.startsWith(route))

  // 使用主路由作为 key，这样同一主路由下的切换不会触发动画
  const animationKey = mainPath || location.pathname

  // 路由变化时重置状态
  useEffect(() => {
    setIsReady(false)
    // 给一个很短的延迟，确保组件已经渲染
    const timer = setTimeout(() => setIsReady(true), 300)
    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <Container>
      <HomePageWrapper />
      <AnimatePresence mode="wait">
        {!isHomePage && (
          <PageContainer
            key={animationKey}
            initial={isReady ? 'initial' : false}
            animate={isReady ? 'animate' : false}
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}>
            <Routes location={location}>
              <Route path="/agents" element={<AgentsPage />} />
              <Route path="/paintings/*" element={<PaintingsRoutePage />} />
              <Route path="/translate" element={<TranslatePage />} />
              <Route path="/files" element={<FilesPage />} />
              <Route path="/knowledge" element={<KnowledgePage />} />
              <Route path="/apps" element={<AppsPage />} />
              <Route path="/mcp-servers/*" element={<McpServersPage />} />
              <Route path="/settings/*" element={<SettingsPage />} />
            </Routes>
          </PageContainer>
        )}
      </AnimatePresence>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 0;
  overflow: hidden;
`

const HomePageWrapper = styled(HomePage)`
  display: flex;
  width: 100%;
  height: 100%;
`

const PageContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-base);
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 10;
`

const pageTransition = {
  type: 'tween',
  duration: 0.25,
  ease: 'easeInOut'
}

const pageVariants = {
  initial: { y: '100%' },
  animate: { y: 0 },
  exit: { y: '100%' }
}

export default RouteContainer
