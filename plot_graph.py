import matplotlib
import matplotlib.pyplot as plt
import numpy as np

plt.style.use('dark_background')
matplotlib.rc('font', size=20)
matplotlib.rc('savefig', facecolor='#222222')
matplotlib.rc('axes', facecolor='#222222')

a = np.linspace(0.0, 1.0, 100)
Cp = 4 * a * (1 - a)**2

plt.plot(a, Cp, lw=3)
plt.xlabel('$a$')
plt.ylabel('$C_P$')
ax = plt.gca()
# plt.gcf().patch.set_facecolor('#222222')
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

plt.savefig('a_graph.png', bbox_inches='tight')
