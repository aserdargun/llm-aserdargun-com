import { defineConfig, devices } from '@playwright/test'
import serverlessChromium from '@sparticuz/chromium'
import { inflate } from '@sparticuz/chromium'
import { createReadStream, existsSync, mkdirSync, statSync, unlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pipeline } from 'node:stream/promises'
import { createBrotliDecompress } from 'node:zlib'
import { extract } from 'tar-fs'

const chromiumBin = join(import.meta.dirname, 'node_modules/@sparticuz/chromium/bin')
async function ensureArchive(source: string, output: string, marker: string) {
  if (existsSync(marker)) return
  mkdirSync(output, { recursive: true })
  await pipeline(createReadStream(source), createBrotliDecompress(), extract(output, { chown: false } as Parameters<typeof extract>[1]))
}
await Promise.all([
  ensureArchive(join(chromiumBin, 'fonts.tar.br'), join(tmpdir(), 'atlas-fonts'), join(tmpdir(), 'atlas-fonts/fonts.conf')),
  ensureArchive(join(chromiumBin, 'swiftshader.tar.br'), tmpdir(), join(tmpdir(), 'libGLESv2.so')),
])
process.env.FONTCONFIG_FILE = join(import.meta.dirname, 'e2e/fonts.conf')
process.env.XDG_CACHE_HOME = join(tmpdir(), 'atlas-chromium-cache')
mkdirSync(process.env.XDG_CACHE_HOME, { recursive: true })
serverlessChromium.setGraphicsMode = true
const cachedChromium = join(tmpdir(), 'chromium')
if (existsSync(cachedChromium) && statSync(cachedChromium).size === 0) unlinkSync(cachedChromium)
const executablePath = await inflate(join(chromiumBin, 'chromium.br'))

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    launchOptions: { executablePath, args: serverlessChromium.args },
  },
  projects: [
    { name: 'desktop-chromium', testMatch: '**/*.desktop.spec.ts', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile-chromium', testMatch: '**/*.mobile.spec.ts', use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173/tr',
    reuseExistingServer: !process.env.CI,
  },
})
